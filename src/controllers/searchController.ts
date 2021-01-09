import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import Stall from '../models/Stall';
import { Sequelize } from 'sequelize';
import HawkerCentre from '../models/HawkerCentre';
import Review from '../models/Review';

function getStallInclude() {
  return [
    { association: Stall.associations.Images, attributes: ['id', 'downloadUrl'] },
    {
      association: Stall.associations.HawkerCentre,
      include: [HawkerCentre.associations.Region],
    },
    {
      association: Stall.associations.Categories,
    },
  ];
}

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
    const stalls = await findStallsByIds(stallIdsArray);
    req.stalls = stalls;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieves all stalls that match a given set of ids.
 * @param ids Ids of stalls to be retrieved.
 */
async function findStallsByIds(ids: number[]) {
  const stalls = await Stall.findAll({
    include: getStallInclude(),
    where: {
      id: ids,
    },
  });

  // To obtain all stall ratings
  const ratings = await Review.findAll({
    where: {
      stallId: ids,
    },
    attributes: [
      'stallId',
      [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 2), 'rating'],
    ],
    group: ['stallId'],
  });

  stalls.map(async (stall: Stall) => {
    const filteredRating = ratings.filter(rating => rating.stallId === stall.id);
    const rating: number = filteredRating.length ? filteredRating[0].rating : 0;
    await stall.setDataValue('rating', rating);
  });

  return stalls;
}

async function findAllStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const stalls = await Stall.findAll({
      include: getStallInclude(),
    });

    // To obtain all stall ratings
    const ratings = await Review.findAll({
      attributes: [
        'stallId',
        [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 2), 'rating'],
      ],
      group: ['stallId'],
    });

    stalls.map(async (stall: Stall) => {
      const filteredRating = ratings.filter(rating => rating.stallId === stall.id);
      const rating = filteredRating.length ? filteredRating[0].rating : 0;
      await stall.setDataValue('rating', rating);
    });

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
      const propertiesToDelete = ['description', 'contactNo', 'unitNo'];
      propertiesToDelete.forEach(property => delete jsonStall[property]);
      return jsonStall;
    });
    res.status(200).json(updatedStalls);
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

export const searchFuncs = [searchStalls, mapStallToCard];
export const emptySearchFuncs = [findAllStalls, mapStallToCard];
