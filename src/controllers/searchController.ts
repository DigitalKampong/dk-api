import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import Stall from '../models/Stall';
import { findAllStallsFunc, findStallsByIdsFunc } from './stallController';

async function searchStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const query = cleanInput(req.params.query);
    const stallIds = await Stall.sequelize!.query(
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
            WHERE _search @@ to_tsquery('english', 'drinks')
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
    const stallIdsArray = stallIds.reduce((acc: number[], cur) => {
      acc.push(cur.getDataValue('id'));
      return acc;
    }, []);
    const stalls = await findStallsByIdsFunc(stallIdsArray);
    req.stalls = stalls;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Formats stall information to display them on cards.
 * @param stalls Sequelize instances of stalls to be formmatted.
 */
async function mapStallToCard(req: Request, res: Response, next: NextFunction) {
  try {
    const stalls = req.stalls!;
    const updatedStalls = stalls.map(stall => {
      const jsonStall = JSON.parse(JSON.stringify(stall));

      jsonStall['Categories'] = jsonStall['Categories'].map(
        (category: Category) => category['name']
      );
      const propertiesToDelete = ['description', 'contactNo', 'unitNo', 'Products', 'Reviews'];
      propertiesToDelete.forEach(property => delete jsonStall[property]);
      return jsonStall;
    });
    req.stalls = updatedStalls;
    next();
  } catch (err) {
    next(err);
  }
}

async function showStalls(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.stalls);
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

export const searchFuncs = [searchStalls, mapStallToCard, showStalls];
export const emptySearchFuncs = [findAllStallsFunc, mapStallToCard, showStalls];
