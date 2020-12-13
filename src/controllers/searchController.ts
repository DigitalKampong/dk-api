import Product from '../models/Product';
import {Request, Response, NextFunction} from 'express';

async function searchProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.sequelize?.query(
      `
        SELECT *
        FROM "Products"
        WHERE _search @@ plainto_tsquery('english', '${req.params.query}');
      `,
      {
        model: Product,
        replacements: {query: req.params.query},
      }
    );
    if (product === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export const searchProductFuncs = [searchProduct];
