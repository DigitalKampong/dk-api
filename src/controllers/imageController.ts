import { Storage } from '@google-cloud/storage';
import multer from 'multer';

import { GCS_BUCKET, GCS_CLIENT_EMAIL, GCS_PRIVATE_KEY } from '../consts';

function fileFilter(req: Request, file: Express.Multer.File, cb: Function) {

  // use mimetype -> get extension -> reject everything that is not image
  file.mimetype
}


// Limit of 5MB per image
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });


const credentials = {
  client_email: GCS_CLIENT_EMAIL,
  private_key: GCS_PRIVATE_KEY,
};
const storage = new Storage({ credentials });
const bucket = storage.bucket(GCS_BUCKET);

function getPublicUrl(filename: string): string {
  return `https://storage.googleapis.com/${GCS_BUCKET}/${filename}`;
}

function uploadToGCS(req: Request, res: Response, next: NextFunction) {}
