import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction, Express } from 'express';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

import Image from '../models/Image';
import { ON_GAE, GCS_BUCKET, GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY, MAX_IMAGE_SIZE } from '../consts';
import { BadRequestError, UploadFileError } from '../errors/httpErrors';
import { Transaction } from 'sequelize/types';

/**
 * Image processing pipeline
 * 1. Respective controllers should check that the respective productId/stallId in the request is correct.
 * 2. Multer will extract image data from multipart-form and put it into req.files
 * 3. The images get uploaded to GCS and their corresponding names will be in req.fileNames (This array will be analogous to req.files)
 * 4. In the respective controllers (e.g. product/stall), the corresponding database objects for images should be created and
 *    associated to the actual product/stall.
 *
 * At any point of time, the request may be short-circuited due to invalid file, file too large etc.
 */

function fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
  const regexp = /png|jpe?g|gif/;
  const result = mime.extension(file.mimetype);

  if (!result || !regexp.test(result)) {
    // Short circuits the request chain
    cb(new BadRequestError(`Invalid mimetype for ${file.originalname}`));
  } else {
    cb(null, true);
  }
}

let storage: Storage;

if (ON_GAE) {
  storage = new Storage();
} else {
  const credentials = {
    client_email: GCS_CLIENT_EMAIL,
    private_key: GCS_PRIVATE_KEY,
  };
  storage = new Storage({ credentials });
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: MAX_IMAGE_SIZE },
});

const bucket = storage.bucket(GCS_BUCKET);

// Resolve name collisions
async function generateGcsName(ext: string) {
  if (ext[0] !== '.') ext = '.' + ext;

  let gcsName = `${uuidv4()}${ext}`;

  // API returns response as [boolean]
  while ((await bucket.file(gcsName).exists())[0]) {
    gcsName = `${uuidv4()}${ext}`;
  }

  return gcsName;
}

async function sendUploadToGCS(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.files?.length) {
      throw new BadRequestError('No files found in request');
    }

    const promises = [];

    // There will never be other file fields so this will always be an array.
    for (const file of req.files as Express.Multer.File[]) {
      const ext = mime.extension(file.mimetype) as string; // Checked in prev mw
      const gcsName = await generateGcsName(ext);
      const gcsFile = bucket.file(gcsName);

      const promise = new Promise((resolve, reject) => {
        const stream = gcsFile.createWriteStream();

        stream.on('error', err => {
          reject(new UploadFileError(file.originalname, err));
        });

        stream.on('finish', () => {
          resolve(gcsName);
        });

        stream.end(file.buffer);
      });

      promises.push(promise);
    }

    req.fileNames = (await Promise.all(promises)) as string[];
    next();
  } catch (err) {
    next(err);
  }
}

async function uploadImgFromDisk(filepath: string) {
  const ext = path.extname(filepath);
  const gcsName = await generateGcsName(ext);
  const buffer = fs.readFileSync(filepath);
  const file = bucket.file(gcsName);

  await new Promise((resolve, reject) => {
    const stream = file.createWriteStream();
    stream.on('error', () => {
      reject(err);
    });

    stream.on('finish', () => {
      resolve();
    });

    stream.end(buffer);
  });

  const img = (await createImages([gcsName]))[0];
  return img;
}

async function createImages(fileNames: string[], t?: Transaction) {
  const promises = fileNames.map(name => Image.create({ fileName: name }, { transaction: t }));
  const images = await Promise.all(promises);
  return images;
}

async function destroyImageIds(imageIds: number[], t?: Transaction) {
  const images = await Image.findAll({ where: { id: imageIds }, transaction: t });
  await destroyImages(images, t);
  return;
}

async function destroyImages(images: Image[], t?: Transaction) {
  // Unlink the images first before removing them from gcs
  const imageIds = images.map(image => image.id);
  await Image.destroy({ where: { id: imageIds }, transaction: t });
  const promises = images.map(image => {
    return bucket.file(image.fileName).delete();
  });
  await Promise.all(promises);
  return;
}

export { upload, sendUploadToGCS, createImages, destroyImages, destroyImageIds, uploadImgFromDisk };
