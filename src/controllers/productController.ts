import { Request, Response, NextFunction } from 'express';
import { upload, sendUploadToGCS, createImages } from './imageController';
import Product from '../models/Product';
import Stall from '../models/Stall';
import { NotFoundError } from '../errors/httpErrors';

import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';

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
    await req.product!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function uploadProductImages(req: Request, res: Response, next: NextFunction) {
  try {
    const images = await createImages(req.fileNames!);
    let product = req.product!;
    await product.addImages(images);
    product = await product.reload({ include: getProductInclude() });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export const indexProductFuncs = [indexProduct];
export const showProductFuncs = [retrieveProduct, showProduct];
export const createProductFuncs = [createProduct];
export const updateProductFuncs = [retrieveProduct, updateProduct];
export const destroyProductFuncs = [retrieveProduct, destroyProduct];
export const uploadProductImagesFuncs = [
  retrieveProduct,
  upload.array(UPLOAD_FORM_FIELD, MAX_NUM_IMAGES),
  sendUploadToGCS,
  uploadProductImages,
];
