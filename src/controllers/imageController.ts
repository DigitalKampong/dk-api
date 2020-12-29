import { Request, Response, NextFunction, Express } from 'express';
import { Op } from 'sequelize';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

import Image from '../models/Image';
import { GCS_BUCKET, GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY, MAX_IMAGE_SIZE } from '../consts';
import { BadRequestError, UploadFileError } from '../errors/httpErrors';

/**
 * Image processing pipeline
 * 1. Multer will extract image data from multipart-form and put it into req.files
 * 2. The images get uploaded to GCS and their corresponding public url will be in req.downloadUrls (This array will be analogous to req.files)
 * 3. The images will have corresponding database objects created, they will be in req.images.
 * 4. The association of images to product/stall will be done in their respective controllers.
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

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: MAX_IMAGE_SIZE },
});

const credentials = {
  client_email: GCS_CLIENT_EMAIL,
  private_key: GCS_PRIVATE_KEY,
};
const storage = new Storage({ credentials });
const bucket = storage.bucket(GCS_BUCKET);

// function getPublicUrl(filename: string): string {
//   return `https://storage.googleapis.com/${GCS_BUCKET}/${filename}`;
// }

// Resolve name collisions
async function generateGcsName(ext: string) {
  let gcsName = `${uuidv4()}.${ext}`;

  // API returns response as [boolean]
  while ((await bucket.file(gcsName).exists())[0]) {
    gcsName = `${uuidv4()}.${ext}`;
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

// Function expects that req.fileNames will be defined
// async function createImages(req: Request, res: Response, next: Function) {
//   const promises = req.fileNames!.map(name => {
//     return Image.create({ fileName: name })
//   });

//   try {
//     req.images = await Promise.all(promises);
//     next();
//   } catch (err) {
//     next(err);
//   }
// }

async function createImages(fileNames: string[]) {
  const promises = fileNames.map(name => Image.create({ fileName: name }));
  const images = await Promise.all(promises);
  return images;
}

async function destroyImages(imageIds: number[]) {
  await Image.destroy({ where: { id: { [Op.in]: imageIds } } });
  return;
}

export { upload, sendUploadToGCS, createImages, destroyImages };
