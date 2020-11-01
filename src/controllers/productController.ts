import Product from '../models/Product';
import {Request, Response, NextFunction} from 'express';

async function retrieveProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findByPk(req.params.id, {
      attributes: [
        ['id', 'productId'],
        'name',
        'category',
        'description',
        'price',
        'image',
        'stallId',
        'createdAt',
        'updatedAt',
      ],
    });
    if (product === null) {
      res.status(404).end();
      return;
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
      attributes: [
        ['id', 'productId'],
        'name',
        'category',
        'description',
        'price',
        'image',
        'stallId',
        'createdAt',
        'updatedAt',
      ],
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
    const temp = req.body;
    const newProduct = {id: temp['productId'], ...temp};
    delete newProduct['productId'];
    const product = await Product.create(newProduct);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.body;
    const updatedProduct = {id: temp['productId'], ...temp};
    delete updatedProduct['productId'];
    const product = await req.product!.update(updatedProduct);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

async function destroyProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.product;
    const id = temp!.getDataValue('productId');
    await Product.destroy({where: {id}});
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexProductFuncs = [indexProduct];
export const showProductFuncs = [retrieveProduct, showProduct];
export const createProductFuncs = [createProduct];
export const updateProductFuncs = [retrieveProduct, updateProduct];
export const destroyProductFuncs = [retrieveProduct, destroyProduct];
