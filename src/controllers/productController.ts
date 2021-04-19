import { Request, Response, NextFunction } from 'express';
import {
  upload,
  uploadFormImgs,
  createImages,
  destroyImageIds,
  destroyImages,
} from './imageController';
import { Product, Stall } from '../models';
import { BadRequestError, NotFoundError } from '../errors/httpErrors';
import multer from 'multer';
import { parse } from 'fast-csv';
import { generateFileFilter } from '../utils/uploadUtil';
import { ProductCreationAttributes } from '../models/Product';

import {
  MAX_NUM_IMAGES,
  MAX_CSV_SIZE,
  UPLOAD_CSV_FORM_FIELD,
  UPLOAD_IMAGE_FORM_FIELD,
} from '../consts';
import sequelize from '../db';

function getProductInclude() {
  return [
    { association: Product.associations.Images, attributes: ['id', 'downloadUrl'] },
    {
      association: Product.associations.Stall,
      include: [Stall.associations.HawkerCentre],
    },
  ];
}

async function retrieveProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: getProductInclude(),
    });
    if (product === null) {
      throw new NotFoundError('Product cannot be found');
    }
    req.product = product;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await Product.findAll({
      include: getProductInclude(),
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

async function showProduct(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.product);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    let product = await Product.create(req.body);
    product = await product.reload({ include: getProductInclude() });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// Upload csv file to import data
const csvUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: generateFileFilter(/csv/),
  limits: { fileSize: MAX_CSV_SIZE },
});

/**
 * Csvfile needs to have stall attributes as its header on the first row. Attributes that are required to create a stall have to be there.
 * It is okay to omit optional attributes.
 *
 * Example of csv file:
 * name,description,price
 * test,test description,97
 * test2,test description,29
 */
async function importProducts(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      throw new BadRequestError('No file found in request');
    }

    const csvString = req.file.buffer.toString('utf-8').trim();
    const data: ProductCreationAttributes[] = [];
    let parseError = '';
    let currRow = 2; // header is on first row

    await new Promise((resolve, _reject) => {
      const stream = parse({ headers: true })
        .on('error', err => {
          // Stream will automatically exit once a parsing error is detected.
          const errMsg = `Row ${currRow}: ${err.message}`;
          console.error(errMsg);
          parseError = errMsg;
          currRow += 1;
        })
        .on('data', row => {
          row.stallId = req.params.id;
          data.push(row);
          currRow += 1;
        })
        .on('end', (rowCount: number) => resolve(rowCount));

      stream.write(csvString);
      stream.end();
    });

    if (parseError !== '') {
      throw new BadRequestError(parseError);
    }

    const products = await Product.bulkCreate(data);
    res.status(200).json(`Successfully created ${products.length} products`);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await req.product!.update(req.body);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

async function destroyProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = req.product!;

    await sequelize.transaction(async t => {
      const images = await product.getImages({ transaction: t });
      if (images.length > 0) {
        await destroyImages(images, { transaction: t });
      }
      await product.destroy({ transaction: t });
    });

    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function uploadProductImages(req: Request, res: Response, next: NextFunction) {
  try {
    let product = req.product!;

    await sequelize.transaction(async t => {
      const images = await createImages(req.fileNames!, { transaction: t });
      await product.addImages(images, { transaction: t });
    });

    product = await product.reload({ include: getProductInclude() });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

async function destroyProductImages(req: Request, res: Response, next: NextFunction) {
  try {
    const imageIds = req.body['imageIds'];
    if (!Array.isArray(imageIds)) {
      throw new BadRequestError('imageIds key not found in body or not an array');
    }

    await destroyImageIds(imageIds as number[]);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexProductFuncs = [indexProduct];
export const showProductFuncs = [retrieveProduct, showProduct];
export const createProductFuncs = [createProduct];
export const importProductsFuncs = [csvUpload.single(UPLOAD_CSV_FORM_FIELD), importProducts];
export const updateProductFuncs = [retrieveProduct, updateProduct];
export const destroyProductFuncs = [retrieveProduct, destroyProduct];
export const uploadProductImagesFuncs = [
  retrieveProduct,
  upload.array(UPLOAD_IMAGE_FORM_FIELD, MAX_NUM_IMAGES),
  uploadFormImgs,
  uploadProductImages,
];
export const destoryProductImagesFuncs = [destroyProductImages];
