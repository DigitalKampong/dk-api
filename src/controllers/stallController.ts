import { Request, Response, NextFunction } from 'express';
import { upload, sendUploadToGCS, createImages } from './imageController';

import Stall from '../models/Stall';
import HawkerCentre from '../models/HawkerCentre';
import Review from '../models/Review';
import { NotFoundError } from '../errors/httpErrors';
import { Sequelize } from 'sequelize';

import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';

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
    await req.stall!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function uploadStallImages(req: Request, res: Response, next: NextFunction) {
  try {
    let stall = req.stall!;
    await stall.addImages(req.images);
    stall = await stall.reload({ include: getStallInclude() });
    res.status(200).json(stall);
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
  createImages,
  uploadStallImages,
];
