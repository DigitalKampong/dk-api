import { Request, Response, NextFunction } from 'express';
import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

import { GCS_BUCKET, GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY, MAX_IMAGE_SIZE } from '../consts';

/**
 * Image processing pipeline
 * 1. Multer will extract image data from multipart-form and put it into req.files
 * 2. The images get uploaded to GCS and their corresponding public url will be in req.downloadUrls (This array will be analogous to req.files)
 * 3. The images will have corresponding database objects created.
 * 4. The association of images to product/stall will be done in their respective controllers.
 *
 * At any point of time, the request may be short-circuited due to invalid file, file too large etc.
 */

function fileFilter(req: Request, file: Express.Multer.File, cb: Function) {
  console.log('HI');
  const regexp = /png|jpe?g|gif/;
  const result = mime.extension(file.mimetype);

  console.log(result);

  if (!result || !regexp.test(result)) {
    // TODO: Could throw an error here too
    console.log('invalid');
    return cb(null, false);
  } else {
    console.log('valid');
    cb(null, true);
  }
}

// Limit of 5MB per image
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

function getPublicUrl(filename: string): string {
  return `https://storage.googleapis.com/${GCS_BUCKET}/${filename}`;
}

// Resolve name collisions
async function generateGcsName(ext: string) {
  let gcsName = `${uuidv4()}.${ext}`;

  // API returns response as [boolean]
  while (await bucket.file(gcsName).exists()[0]) {
    gcsName = `${uuidv4()}.${ext}`;
  }

  return gcsName;
}

async function sendUploadToGCS(req: Request, res: Response, next: NextFunction) {
  if (!req.files) {
    // TODO: Throw error, next(Error class)
    res.status(400).json('No file in request');
    return;
  }

  const promises = [];
  for (const file of req.files) {
    const ext = mime.extension(file.mimetype);
    const gcsName = await generateGcsName(ext);
    const gcsFile = bucket.file(gcsName);

    const promise = new Promise((resolve, reject) => {
      const stream = gcsFile.createWriteStream();

      stream.on('error', err => {
        // TODO: Create error object with original filename and send back to frontend
        reject(err);
      });

      stream.on('finish', () => {
        resolve(getPublicUrl(gcsName));
      });

      stream.end(file.buffer);
    });

    promises.push(promise);
  }

  try {
    req.downloadUrls = await Promise.all(promises);
    next();
  } catch (err) {
    // This will trip if one of the promise rejects and now handled by general error handler.
    next(err);
  }
}

async function createImages(req: Request, res: Response, next: Function) {
  next();
}

export { upload, sendUploadToGCS, createImages };
