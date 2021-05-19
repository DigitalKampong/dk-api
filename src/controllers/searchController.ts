import { Request, Response, NextFunction } from 'express';
import { getStallsInclude, fmtStallsResp } from './stallController';
import { Stall } from '../models';
import { generatePagination, fmtPaginationResp } from '../utils/paginationUtil';

async function searchStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const rawQuery: string | undefined = req.params.query?.trim();

    const categoryFilter = req.query.category as string;
    const categoryFilterQueries = categoryFilter ? `&category=${categoryFilter}` : '';
    const categoryFilterCondition = categoryFilter
      ? `id IN (
            SELECT "stallId"
            FROM "CategoryStalls"
            WHERE "categoryId" in (${categoryFilter!
              .split(',')
              .map((id: string) => `'${id}'`)
              .join(',')})
            UNION
            SELECT "Stalls".id
            FROM "Stalls"
            LEFT JOIN "CategoryStalls"
            ON "Stalls".id = "CategoryStalls"."stallId"
            WHERE "CategoryStalls"."stallId" ISNULL
          )`
      : undefined;

    const regionFilter = req.query.region as string;
    const regionFilterQueries = regionFilter ? `&region=${regionFilter}` : '';
    const regionFilterCondition = regionFilter
      ? `"hawkerCentreId" IN (
            SELECT id
            FROM "HawkerCentres"
            WHERE "regionId" in (${regionFilter!
              .split(',')
              .map((id: string) => `'${id}'`)
              .join(',')})
          )`
      : undefined;

    let limit = parseInt(req.query.limit! as string);
    let page = parseInt(req.query.page! as string);

    if (!limit || !page) {
      limit = 20;
      page = 1;
    }

    const offset = (page - 1) * limit;
    let query, queryString, sourceRoute;

    if (!rawQuery) {
      queryString = ` SELECT id
                      FROM "Stalls"
                      WHERE ${categoryFilterCondition || 'TRUE'}
                      AND ${regionFilterCondition || 'TRUE'}`;
      sourceRoute = '/search';
    } else {
      query = cleanInput(rawQuery);
      queryString = ` SELECT id, ts_rank_cd(to_tsquery('english', '${query}'), _search) AS score
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
                      AND ${categoryFilterCondition || 'TRUE'}
                      AND ${regionFilterCondition || 'TRUE'}
                      ORDER BY score DESC`;
      sourceRoute = `/search/${rawQuery}`;
    }

    const result = await Stall.sequelize!.query(queryString, {
      model: Stall,
    });

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

    const rows = await fmtStallsResp(stalls.rows);
    const pagination = generatePagination(
      limit,
      page,
      stalls.count,
      sourceRoute,
      categoryFilterQueries + regionFilterQueries
    );
    res.status(200).json(fmtPaginationResp(stalls.count, rows, pagination));
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
