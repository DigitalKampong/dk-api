import Product from '../models/Product';
import {Request, Response, NextFunction} from 'express';

async function searchProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const query = cleanInput(req.params.query);
    const product = await Product.sequelize?.query(
      `
        SELECT *
        FROM "Products"
        WHERE _search @@ to_tsquery('english', '${query}');
      `,
      {
        model: Product,
        replacements: {query: query},
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

// removes all '|' and '&' for to_tsquery
function cleanInput(input: String) {
  return input.replace(/[|&]+/g, '').replace(/ /g, '|');
}

export const searchProductFuncs = [searchProduct];
