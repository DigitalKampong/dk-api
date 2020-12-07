import Product from '../models/Product';
import {Request, Response, NextFunction} from 'express';
import Stall from '../models/Stall';
import HawkerCentre from '../models/HawkerCentre';

async function postIdFormatting(req: Request, res: Response, next: NextFunction) {
  try {
    const product = {id: req.body['productId'], ...req.body};
    delete product['productId'];
    req.body = product;
    next();
  } catch (err) {
    next(err);
  }
}

async function getIdFormatting(req: Request, res: Response, next: NextFunction) {
  try {
    let plainProduct = JSON.parse(JSON.stringify(req.product));
    plainProduct = {productId: plainProduct['id'], ...plainProduct};
    delete plainProduct['id'];

    req.body = plainProduct;
    next();
  } catch (err) {
    next(err);
  }
}

async function getMultipleIdFormatting(req: Request, res: Response, next: NextFunction) {
  try {
    const changedKeys = req.body.map((x: Product) => {
      let plainProduct = JSON.parse(JSON.stringify(x));
      plainProduct = {
        productId: plainProduct['id'],
        productName: plainProduct['name'],
        productCategory: plainProduct['category'],
        productPrice: plainProduct['price'],
        productImage: plainProduct['image'],
        productDescription: plainProduct['description'],
        stallName: plainProduct['Stall']['name'],
        stallAddress:
          plainProduct['Stall']['HawkerCentre']['address'] + ' ' + plainProduct['Stall']['unitNo'],
        stallRating: plainProduct['Stall']['rating'],
        ...plainProduct,
      };
      deleteProperties(plainProduct, [
        'id',
        'name',
        'category',
        'price',
        'image',
        'description',
        'createdAt',
        'updatedAt',
        'Stall',
      ]);
      return plainProduct;
    });

    res.status(201).json(changedKeys);
  } catch (err) {
    next(err);
  }
}

async function retrieveProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findByPk(req.params.id);
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
      include: [
        {
          association: Product.associations.Stall,
          include: [
            {
              association: Stall.associations.HawkerCentre,
            },
          ],
        },
      ],
    });
    req.body = products;
    next();
  } catch (err) {
    next(err);
  }
}

async function showProduct(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.create(req.body);
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

function deleteProperties(object: {[x: string]: unknown}, properties: string[]) {
  for (const property of properties) {
    property in object && delete object[property];
  }
}

export const indexProductFuncs = [indexProduct, getMultipleIdFormatting];
export const showProductFuncs = [retrieveProduct, getIdFormatting, showProduct];
export const createProductFuncs = [postIdFormatting, createProduct];
export const updateProductFuncs = [retrieveProduct, postIdFormatting, updateProduct];
export const destroyProductFuncs = [retrieveProduct, destroyProduct];
