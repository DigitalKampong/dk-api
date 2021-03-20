import { Request, Express } from 'express';
import mime from 'mime-types';

import { BadRequestError } from '../errors/httpErrors';

function generateFileFilter(regexp: RegExp) {
  // the actual fileFilter function
  return (req: Request, file: Express.Multer.File, cb: Function) => {
    const result = mime.extension(file.mimetype);

    if (!result || !regexp.test(result)) {
      // Short circuits the request chain
      cb(new BadRequestError(`Invalid mimetype for ${file.originalname}. Only accept ${regexp}`));
    } else {
      cb(null, true);
    }
  };
}

export { generateFileFilter };
