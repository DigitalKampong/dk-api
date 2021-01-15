import { Request, Response, NextFunction } from 'express';
import { getStallsInclude, fmtStallsResp } from './stallController';
import { Stall } from '../models';
import { generatePaginationWithQueries } from '../utils/paginationUtil';

async function searchStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const rawQuery: string | undefined = req.params.query?.trim();

    const categoryFilter = req.query.category as string[];
    const categoryFilterQueries = categoryFilter
      ? categoryFilter.map((id: string) => `&category=${id}`).join('')
      : '';
    const categoryFilterCondition = categoryFilter
      ? `AND id IN (
            SELECT "stallId"
            FROM "CategoryStalls"
            WHERE "categoryId" in (${categoryFilter!.map((id: string) => `'${id}'`).join(',')})
          )`
      : '';

    const regionFilter = req.query.region as string[];
    const regionFilterQueries = regionFilter
      ? regionFilter.map((id: string) => `&region=${id}`).join('')
      : '';
    const regionFilterCondition = regionFilter
      ? `AND "hawkerCentreId" IN (
            SELECT id
            FROM "HawkerCentres"
            WHERE "regionId" in (${regionFilter!.map((id: string) => `'${id}'`).join(',')})
          )`
      : '';

    const limit = +req.query.limit!;
    const page = +req.query.page!;
    const offset = (page - 1) * limit;

    if (!rawQuery) {
      const stalls = await Stall.findAndCountAll({
        order: [['id', 'ASC']],
        include: getStallsInclude(),
        limit: limit,
        offset: offset,
        distinct: true,
      });
      stalls.rows = await fmtStallsResp(stalls.rows);
      stalls.pagination = generatePaginationWithQueries(
        limit,
        page,
        stalls.count,
        '/search/',
        categoryFilterQueries + regionFilterQueries
      );
      res.status(200).json(stalls);
      return;
    }

    const query = cleanInput(rawQuery);
    const result = await Stall.sequelize!.query(
      `
          SELECT id
          FROM "Stalls"
          WHERE (
            id IN (
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
          )
          ${categoryFilterCondition}
          ${regionFilterCondition}
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

    const stalls = await Stall.findAndCountAll({
      where: { id: stallIds },
      order: [['id', 'ASC']],
      include: getStallsInclude(),
      limit: limit,
      offset: offset,
      distinct: true,
    });

    stalls.rows = await fmtStallsResp(stalls.rows);

    stalls.pagination = generatePaginationWithQueries(
      limit,
      page,
      stalls.count,
      '/search/',
      categoryFilterQueries + regionFilterQueries
    );
    res.status(200).json(stalls);
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
