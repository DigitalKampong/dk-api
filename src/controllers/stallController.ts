import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { Includeable } from 'sequelize/types';
import multer from 'multer';
import { parse } from 'fast-csv';

import {
  UPLOAD_CSV_FORM_FIELD,
  MAX_CSV_SIZE,
  MAX_NUM_IMAGES,
  UPLOAD_IMAGE_FORM_FIELD,
} from '../consts';
import { BadRequestError, NotFoundError } from '../errors/httpErrors';

import sequelize from '../db';
import { Stall, HawkerCentre, Review, Product, Favourite } from '../models';
import { upload, uploadFormImgs, createImages, destroyImageIds } from './imageController';
import { generatePagination, fmtPaginationResp } from '../utils/paginationUtil';
import { generateFileFilter } from '../utils/uploadUtil';
import { isHawkerCentreClosed } from '../utils/hawkerCentreUtil';
import { StallCreationAttributes } from '../models/Stall';

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
  let reviews = stall.Reviews;

  if (reviews === undefined) {
    reviews = await stall.getReviews({ order: [['id', 'ASC']] });
  }

  const total = reviews.reduce((accum, review) => accum + review.rating, 0);
  const rating = total ? (total / reviews!.length).toFixed(2) : '0';
  return rating;
}

async function getCategories(stall: Stall) {
  let categories = stall.Categories;

  if (categories === undefined) {
    categories = await stall.getCategories({ order: [['id', 'ASC']] });
  }

  return categories;
}

/**
 * Format a single stall response
 * @param stall Stall instance
 */
async function fmtStallResp(stall: Stall) {
  const hawkerCentre = stall!.HawkerCentre!;
  const isClosed = isHawkerCentreClosed(hawkerCentre);

  const rating = await getRating(stall);
  const categories = await getCategories(stall);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stallObj: any = stall.get({ plain: true });

  stallObj['categories'] = categories;
  stallObj['rating'] = rating;
  stallObj['HawkerCentre']['isClosed'] = isClosed;

  delete stallObj['Categories'];

  return stallObj;
}

/**
 * Format multiple stalls response
 * @param stalls An array of Stall instances
 */
async function fmtStallsResp(
  stalls: Stall[],
  propertiesToExclude = ['description', 'contactNo', 'Reviews']
) {
  // Properties here will be formatted and returned again.
  const mustExclude = ['Categories'];

  propertiesToExclude = propertiesToExclude.concat(mustExclude);

  const result = await Promise.all(
    stalls.map(async stall => {
      const rating = await getRating(stall);
      const categories = await getCategories(stall);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stallObj: any = stall.get({ plain: true });

      stallObj['categories'] = categories;
      stallObj['rating'] = rating;

      propertiesToExclude.forEach(prop => delete stallObj[prop]);
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
    let limit = parseInt(req.query.limit! as string);
    let page = parseInt(req.query.page! as string);

    if (!limit || !page) {
      limit = 20;
      page = 1;
    }

    const offset = (page - 1) * limit;
    const stalls = await Stall.findAndCountAll({
      order: [['id', 'ASC']],
      include: getStallsInclude(),
      limit: limit,
      offset: offset,
      distinct: true,
    });

    const rows = await fmtStallsResp(stalls.rows);
    const pagination = generatePagination(limit, page, stalls.count, '/stalls');
    res.status(200).json(fmtPaginationResp(stalls.count, rows, pagination));
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

async function bulkCreateStalls(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: This has no pagination, should just return a success message like importStalls.
    const stalls = await Stall.bulkCreate(req.body);
    stalls.forEach(async stall => {
      await stall.reload({ include: getStallInclude() });
      await fmtStallResp(stall);
    });
    res.status(201).json(stalls);
  } catch (err) {
    next(err);
  }
}

// Upload csv file to import data
const csvUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: generateFileFilter(/csv/),
  limits: { fileSize: MAX_CSV_SIZE },
});

/**
 * Csvfile needs to have stall attributes as its header on the first row. Attributes that are required to create a stall have to be there.
 * It is okay to omit optional attributes.
 *
 * Example of csv file:
 * name,description,contactNo,unitNo
 * test,test description,97654321,#01-02
 * test2,test description 2,97654321,#01-03,
 */
async function importStalls(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) {
      throw new BadRequestError('No file found in request');
    }

    const csvString = req.file.buffer.toString('utf-8').trim();
    const data: StallCreationAttributes[] = [];
    let parseError = '';
    let currRow = 2; // header is on first row

    type stallRow = Omit<StallCreationAttributes, 'openingHours'> & {
      openingHours: string;
    };

    await new Promise((resolve, _reject) => {
      const stream = parse<stallRow, StallCreationAttributes>({
        headers: true,
      })
        .transform(
          (data: stallRow): StallCreationAttributes => {
            const dataArr: string[] = data.openingHours.split(' ');
            const days: string[] = [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ];
            const formattedOpeningHours: { [key: string]: object } = {};
            days.forEach(day => {
              let isClosed = !dataArr.includes(day);
              const idx = dataArr.indexOf(day);
              let startTime = null;
              let endTime = null;
              if (!isClosed) {
                startTime = dataArr[idx + 1];
                endTime = dataArr[idx + 2];
                if (!parseInt(startTime) || !parseInt(endTime)) {
                  isClosed = true;
                  startTime = null;
                  endTime = null;
                }
              }
              formattedOpeningHours[day] = {
                allDay: false,
                closed: isClosed,
                start: startTime,
                end: endTime,
              };
            });
            return {
              name: data.name,
              description: data.description,
              contactNo: data.contactNo,
              unitNo: data.unitNo,
              openingHours: JSON.parse(JSON.stringify(formattedOpeningHours)),
              isFeatured: data.isFeatured,
              hawkerCentreId: parseInt(req.params.id),
            };
          }
        )
        .on('error', err => {
          // Stream will automatically exit once a parsing error is detected.
          const errMsg = `Row ${currRow}: ${err.message}`;
          console.error(errMsg);
          parseError = errMsg;
          currRow += 1;
        })
        .on('data', (row: StallCreationAttributes) => {
          data.push(row);
          currRow += 1;
        })
        .on('end', (rowCount: number) => resolve(rowCount));

      stream.write(csvString);
      stream.end();
    });

    if (parseError !== '') {
      throw new BadRequestError(parseError);
    }

    const stalls = await Stall.bulkCreate(data);
    res.status(200).json(`Successfully created ${stalls.length} stalls`);
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

async function bulkDestroyStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const idsToDestroy = req.body['ids'] as Array<number>;
    const stalls = await Stall.findAll({
      where: { id: idsToDestroy },
      include: [
        {
          association: Stall.associations.Products,
          include: [
            {
              association: Product.associations.Images,
            },
          ],
        },
        {
          association: Stall.associations.Images,
        },
      ],
    });

    // Retrieve all images from stalls and its products
    let imageIds: Array<number> = [];
    for (const stall of stalls) {
      imageIds = imageIds.concat(stall.Images!.map(image => image.id));

      for (const product of stall.Products!) {
        imageIds = imageIds.concat(product.Images!.map(image => image.id));
      }
    }

    await sequelize.transaction(async t => {
      if (imageIds.length > 0) await destroyImageIds(imageIds, { transaction: t });

      for (const stall of stalls) {
        await stall.destroy({ transaction: t });
      }
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

async function indexStallReview(req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await Review.findAll({
      where: {
        stallId: req.params.id,
      },
      order: [['id', 'ASC']],
      include: [
        { association: Review.associations.Stall },
        { association: Review.associations.User },
      ],
    });
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
}

async function createStallReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.create({
      ...req.body,
      stallId: req.params.id,
      userId: req.user!.id,
    });
    res.status(201).json(review);
  } catch (err) {
    if (err instanceof UniqueConstraintError)
      next(new BadRequestError('A review for this stall already exists!'));

    next(err);
  }
}

async function createStallFavourite(req: Request, res: Response, next: NextFunction) {
  try {
    // Ignores the request if favourite has already been created
    const fav = (
      await Favourite.findOrCreate({
        where: {
          stallId: req.params.id,
          userId: req.user!.id,
        },
      })
    )[0];
    res.status(201).json(fav);
  } catch (err) {
    next(err);
  }
}

async function destroyStallFavourite(req: Request, res: Response, next: NextFunction) {
  try {
    await Favourite.destroy({ where: { userId: req.user!.id, stallId: req.params.id } });
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function retrieveFeatureStalls(req: Request, res: Response, next: NextFunction) {
  try {
    let limit = parseInt(req.query.limit! as string);
    let page = parseInt(req.query.page! as string);

    if (!limit || !page) {
      limit = 20;
      page = 1;
    }

    const offset = (page - 1) * limit;
    const stalls = await Stall.findAndCountAll({
      where: {
        isFeatured: true,
      },
      order: [['id', 'ASC']],
      include: getStallsInclude(),
      limit: limit,
      offset: offset,
      distinct: true,
    });

    const rows = await fmtStallsResp(stalls.rows);
    const pagination = generatePagination(limit, page, stalls.count, '/stalls/featured');
    res.status(200).json(fmtPaginationResp(stalls.count, rows, pagination));
  } catch (err) {
    next(err);
  }
}

async function updateCategoryStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const categories: number[] = req.body.categoryIds;
    const stall = req.stall!;
    await stall.setCategories(categories);
    await stall.reload();
    res.status(200).send(stall);
  } catch (err) {
    next(err);
  }
}

export { getStallInclude, getStallsInclude, fmtStallResp, fmtStallsResp };

export const indexStallFuncs = [indexStall];
export const showStallFuncs = [retrieveStall, showStall];
export const showFeaturedStallFuncs = [retrieveFeatureStalls];
export const createStallFuncs = [createStall];
export const bulkCreateStallsFuncs = [bulkCreateStalls];
export const importStallsFuncs = [csvUpload.single(UPLOAD_CSV_FORM_FIELD), importStalls];
export const updateStallFuncs = [retrieveStall, updateStall];
export const destroyStallFuncs = [retrieveStall, destroyStall];
export const bulkDestroyStallsFuncs = [bulkDestroyStalls];

export const uploadStallImagesFuncs = [
  retrieveStall,
  upload.array(UPLOAD_IMAGE_FORM_FIELD, MAX_NUM_IMAGES),
  uploadFormImgs,
  uploadStallImages,
];
export const destroyStallImagesFuncs = [destroyStallImages];

export const indexStallReviewFuncs = [indexStallReview];
export const createStallReviewFuncs = [createStallReview];

export const createStallFavouriteFuncs = [createStallFavourite];
export const destroyStallFavouriteFuncs = [destroyStallFavourite];

export const updateCategoryStallsFuncs = [retrieveStall, updateCategoryStalls];
