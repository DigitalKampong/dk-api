import { Request, Response, NextFunction } from 'express';
import { upload, uploadFormImgs, createImages, destroyImageIds } from './imageController';

import { Stall, HawkerCentre, Review } from '../models';
import { BadRequestError, NotFoundError } from '../errors/httpErrors';
import { Includeable } from 'sequelize/types';
import { generatePagination } from '../utils/paginationUtil';
import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';
import Product from '../models/Product';
import sequelize from '../db';

/*
 * Returns the includes needed to fetch associated models for a single stall response
 */
function getStallInclude(): Includeable[] {
  return [
    {
      association: Stall.associations.Products,
      include: [{ association: Product.associations.Images, attributes: ['id', 'downloadUrl'] }],
    },
    { association: Stall.associations.Images, attributes: ['id', 'downloadUrl'] },
    {
      association: Stall.associations.HawkerCentre,
      include: [HawkerCentre.associations.Region],
    },
    {
      association: Stall.associations.Reviews,
      include: [{ association: Review.associations.User, attributes: { exclude: ['password'] } }],
      attributes: { exclude: ['stallId', 'userId'] },
    },
    {
      association: Stall.associations.Categories,
    },
  ];
}

/*
 * Returns the includes needed to fetch associated models for a multiple stalls response
 */
function getStallsInclude(): Includeable[] {
  return [
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

async function getRating(stall: Stall) {
  if (stall.Reviews === undefined) {
    await stall.reload({ include: Stall.associations.Reviews });
  }

  const total = stall.Reviews!.reduce((accum, review) => accum + review.rating, 0);
  const rating = total ? (total / stall.Reviews!.length).toFixed(2) : '0';
  return rating;
}

async function getCategories(stall: Stall) {
  if (stall.Categories === undefined) {
    await stall.reload({ include: Stall.associations.Categories });
  }

  return stall.Categories!.map(cate => cate.name);
}

/**
 * Format a single stall response
 * @param stall Stall instance
 */
async function fmtStallResp(stall: Stall) {
  const rating = await getRating(stall);
  const categories = await getCategories(stall);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stallObj: any = stall.get({ plain: true });

  stallObj['categories'] = categories;
  stallObj['rating'] = rating;

  delete stallObj['Categories'];
  return stallObj;
}

/**
 * Format multiple stalls response
 * @param stalls An array of Stall instances
 */
async function fmtStallsResp(stalls: Stall[]) {
  const propertiesToDelete = ['description', 'contactNo', 'unitNo', 'Categories', 'Reviews'];

  const result = await Promise.all(
    stalls.map(async stall => {
      const rating = await getRating(stall);
      const categories = await getCategories(stall);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stallObj: any = stall.get({ plain: true });

      stallObj['categories'] = categories;
      stallObj['rating'] = rating;

      propertiesToDelete.forEach(prop => delete stallObj[prop]);
      return stallObj;
    })
  );

  return result;
}

async function retrieveStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await Stall.findByPk(req.params.id, {
      include: getStallInclude(),
    });

    if (stall === null) {
      throw new NotFoundError('Stall cannot be found');
    }

    req.stall = stall;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexStall(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = +req.query.limit!;
    const page = +req.query.page!;
    const offset = (page - 1) * limit;

    const stalls = await Stall.findAndCountAll({
      order: [['id', 'ASC']],
      include: getStallsInclude(),
      limit: limit,
      offset: offset,
      distinct: true,
    });

    stalls.rows = await fmtStallsResp(stalls.rows);
    stalls.pagination = generatePagination(limit, page, stalls.count, '/stalls');

    res.status(200).json(stalls);
  } catch (err) {
    next(err);
  }
}

async function showStall(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(await fmtStallResp(req.stall!));
  } catch (err) {
    next(err);
  }
}

async function createStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await Stall.create(req.body);
    await stall.reload({ include: getStallInclude() });
    res.status(201).json(await fmtStallResp(stall));
  } catch (err) {
    next(err);
  }
}

async function updateStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await req.stall!.update(req.body);
    await stall.reload({ include: getStallInclude() });
    res.status(200).json(await fmtStallResp(stall));
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
      if (imageIds.length > 0) await destroyImageIds(imageIds, { transaction: t });
      await stall.destroy({ transaction: t });
    });

    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function uploadStallImages(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = req.stall!;

    await sequelize.transaction(async t => {
      const images = await createImages(req.fileNames!, { transaction: t });
      await stall.addImages(images, { transaction: t });
    });

    await stall.reload({ include: getStallInclude() });
    res.status(200).json(await fmtStallResp(stall));
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

export { getStallInclude, getStallsInclude, fmtStallResp, fmtStallsResp };

export const indexStallFuncs = [indexStall];
export const showStallFuncs = [retrieveStall, showStall];
export const createStallFuncs = [createStall];
export const updateStallFuncs = [retrieveStall, updateStall];
export const destroyStallFuncs = [retrieveStall, destroyStall];
export const uploadStallImagesFuncs = [
  retrieveStall,
  upload.array(UPLOAD_FORM_FIELD, MAX_NUM_IMAGES),
  uploadFormImgs,
  uploadStallImages,
];
export const destroyStallImagesFuncs = [destroyStallImages];
