import { Request, Response, NextFunction } from 'express';
import { upload, sendUploadToGCS, createImages, destroyImageIds } from './imageController';

import Stall from '../models/Stall';
import HawkerCentre from '../models/HawkerCentre';
import Review from '../models/Review';
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
  ];
}

async function getRatings(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.stall) {
      const stall = req.stall;
      const stallId = stall!.getDataValue('id');
      const rating = (
        await Review.findAll({
          where: {
            stallId,
          },
          attributes: [
            [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 2), 'rating'],
          ],
        })
      )[0].getDataValue('rating');
      if (rating) stall.setDataValue('rating', rating);
      else stall.setDataValue('rating', 0);
    }
    if (req.stalls) {
      Promise.all(
        req.stalls.map(async (stall: Stall) => {
          let modifiedStall = JSON.parse(JSON.stringify(stall));
          const stallId: number = modifiedStall['id'];
          const rating = await Review.findAll({
            where: {
              stallId,
            },
            attributes: [
              [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rating')), 2), 'rating'],
            ],
          });

          modifiedStall = { ...modifiedStall, rating: rating[0].getDataValue('rating') };
          return modifiedStall;
        })
      ).then(result => res.status(200).json(result));
    }
  } catch (err) {
    next(err);
  }
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
    const stalls = await Stall.findAll({
      include: getStallInclude(),
    });
    req.stalls = stalls;
    next();
    // res.status(200).json(stalls);
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

export const indexStallFuncs = [indexStall, getRatings];
export const showStallFuncs = [retrieveStall, getRatings, showStall];
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
