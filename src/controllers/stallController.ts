import { Request, Response, NextFunction } from 'express';
import { upload, sendUploadToGCS, createImages, destroyImageIds } from './imageController';

import Stall from '../models/Stall';
import HawkerCentre from '../models/HawkerCentre';
import Review from '../models/Review';
import Category from '../models/Category';
import { BadRequestError, NotFoundError } from '../errors/httpErrors';
import { Sequelize } from 'sequelize';

import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';
import Product from '../models/Product';
import sequelize from '../db';

function getStallInclude() {
  return [
    { association: Stall.associations.Products },
    { association: Stall.associations.Images, attributes: ['id', 'downloadUrl'] },
    {
      association: Stall.associations.HawkerCentre,
      include: [HawkerCentre.associations.Region],
    },
    {
      association: Stall.associations.Reviews,
    },
    {
      association: Stall.associations.Categories,
    },
  ];
}

async function retrieveStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await Stall.findByPk(req.params.id, {
      include: getStallInclude(),
    });

    if (stall === null) {
      throw new NotFoundError('Stall cannot be found');
    }

    // To obtain single stall rating
    const rating = (
      await Review.findAll({
        where: {
          stallId: stall!.id,
        },
        attributes: [
          [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 2), 'rating'],
        ],
      })
    )[0].rating;

    await stall.setDataValue('rating', rating || 0);

    req.stall = stall;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexStall(req: Request, res: Response, next: NextFunction) {
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
      const rating: number = filteredRating.length ? filteredRating[0].rating : 0;
      await stall.setDataValue('rating', rating);
    });

    res.status(200).json(stalls);
  } catch (err) {
    next(err);
  }
}

async function showStall(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.stall);
  } catch (err) {
    next(err);
  }
}

async function createStall(req: Request, res: Response, next: NextFunction) {
  try {
    let stall = await Stall.create(req.body);
    stall = await stall.reload({ include: getStallInclude() });
    res.status(201).json(stall);
  } catch (err) {
    next(err);
  }
}

async function updateStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await req.stall!.update(req.body);
    res.status(200).json(stall);
  } catch (err) {
    next(err);
  }
}

async function destroyStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = req.stall!;
    const products = await stall.getProducts({ include: Product.associations.Images });

    let imageIds = (await stall.getImages()).map(image => image.id);
    for (const p of products) {
      imageIds = imageIds.concat(p.Images!.map(image => image.id));
    }

    await sequelize.transaction(async t => {
      if (imageIds.length > 0) await destroyImageIds(imageIds, t);
      await stall.destroy({ transaction: t });
    });

    res.status(200).end();
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

/**
 * Formats stall information to display them on cards.
 * @param stalls Sequelize instances of stalls to be formmatted.
 */
function mapStallToCard(stalls: Stall[]) {
  const updatedStalls = stalls.map(stall => {
    const jsonStall = JSON.parse(JSON.stringify(stall));

    jsonStall['Categories'] = jsonStall['Categories'].map((category: Category) => category['name']);
    const propertiesToDelete = ['description', 'contactNo', 'unitNo', 'Products', 'Reviews'];
    propertiesToDelete.forEach(property => delete jsonStall[property]);
    return jsonStall;
  });
  return updatedStalls;
}

async function uploadStallImages(req: Request, res: Response, next: NextFunction) {
  try {
    let stall = req.stall!;

    await sequelize.transaction(async t => {
      const images = await createImages(req.fileNames!, t);
      await stall.addImages(images, { transaction: t });
    });

    stall = await stall.reload({ include: getStallInclude() });
    res.status(200).json(stall);
  } catch (err) {
    next(err);
  }
}

async function destroyStallImages(req: Request, res: Response, next: NextFunction) {
  try {
    const imageIds = req.body['imageIds'];
    if (!Array.isArray(imageIds)) {
      throw new BadRequestError('imageIds key not found in body or not an array');
    }

    await destroyImageIds(imageIds as number[]);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const findStallsByIdsFunc = findStallsByIds;
export const mapStallToCardFunc = mapStallToCard;

export const indexStallFuncs = [indexStall];
export const showStallFuncs = [retrieveStall, showStall];
export const createStallFuncs = [createStall];
export const updateStallFuncs = [retrieveStall, updateStall];
export const destroyStallFuncs = [retrieveStall, destroyStall];
export const uploadStallImagesFuncs = [
  retrieveStall,
  upload.array(UPLOAD_FORM_FIELD, MAX_NUM_IMAGES),
  sendUploadToGCS,
  uploadStallImages,
];
export const destroyStallImagesFuncs = [destroyStallImages];
