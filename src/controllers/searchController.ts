import { Request, Response, NextFunction } from 'express';
import { getStallsInclude, fmtStallsResp } from './stallController';

async function searchStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const rawQuery: string | undefined = req.params.query?.trim();

    if (!rawQuery) {
      const stalls = await Stall.findAll({ include: getStallsInclude() });
      res.status(200).json(await fmtStallsResp(stalls));
      return;
    }

    const query = cleanInput(rawQuery);
    const result = await Stall.sequelize!.query(
      `
          SELECT id
          FROM "Stalls"
          WHERE id IN (
            SELECT "stallId"
            FROM "Products"
            WHERE _search @@ to_tsquery('english', '${query}')
          ) OR id IN (
            SELECT id
            FROM "Stalls"
            WHERE _search @@ to_tsquery('english', '${query}')
          ) OR id IN (
            SELECT "stallId"
            FROM "CategoryStalls"
            WHERE "categoryId" IN (
              SELECT id
              FROM "Categories"
              WHERE _search @@ to_tsquery('english', '${query}')
            )
          ) OR "hawkerCentreId" IN (
            SELECT id
            FROM "HawkerCentres"
            WHERE _search @@ to_tsquery('english', '${query}')
          ) OR "hawkerCentreId" IN (
            SELECT id
            FROM "HawkerCentres"
            WHERE "regionId" IN (
              SELECT id
              FROM "Regions"
              WHERE _search @@ to_tsquery('english', '${query}')
            )
          )
        `,
      {
        model: Stall,
        replacements: { query: query },
      }
    );
    const stallIds = result.reduce((acc: number[], cur) => {
      acc.push(cur.getDataValue('id'));
      return acc;
    }, []);
    const stalls = await Stall.findAll({ where: { id: stallIds }, include: getStallsInclude() });
    res.status(200).json(await fmtStallsResp(stalls));
  } catch (err) {
    next(err);
  }
}

/**
 * Removes boolean operators from user query for to_tsquery.
 * @param input User query.
 */
function cleanInput(input: String) {
  return input.replace(/[|&!<>]+/g, '').replace(/ /g, '|');
}

export const searchFuncs = [searchStalls];
