import { HawkerCentre, Stall } from '../models';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../errors/httpErrors';

import { upload, uploadFormImgs, createImages, destroyImageIds } from './imageController';
import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';
import sequelize from '../db';

async function retrieveHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.findByPk(req.params.id, {
      include: [
        {
          association: HawkerCentre.associations.Stalls,
          include: [
            {
              association: Stall.associations.Images,
              attributes: ['id', 'downloadUrl'],
            },
          ],
        },
        { association: HawkerCentre.associations.Images, attributes: ['id', 'downloadUrl'] },
      ],
    });
    if (hawkerCentre === null) {
      throw new NotFoundError('HawkerCentre cannot be found');
    }
    req.hawkerCentre = hawkerCentre;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentres = await HawkerCentre.findAll({
      include: [
        {
          association: HawkerCentre.associations.Region,
        },
        { association: HawkerCentre.associations.Images, attributes: ['id', 'downloadUrl'] },
      ],
    });
    res.status(200).json(hawkerCentres);
  } catch (err) {
    next(err);
  }
}

async function showHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function createHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.create(req.body);
    res.status(201).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function updateHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await req.hawkerCentre!.update(req.body);
    res.status(200).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function destroyHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    await req.hawkerCentre!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function uploadHawkerCentreImages(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = req.hawkerCentre!;

    await sequelize.transaction(async t => {
      const images = await createImages(req.fileNames!, { transaction: t });
      await hawkerCentre.addImages(images, { transaction: t });
    });

    await hawkerCentre.reload({
      include: [
        {
          association: HawkerCentre.associations.Stalls,
          include: [
            {
              association: Stall.associations.Images,
              attributes: ['id', 'downloadUrl'],
            },
          ],
        },
        { association: HawkerCentre.associations.Images, attributes: ['id', 'downloadUrl'] },
      ],
    });
    res.status(200).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function destroyHawkerCentreImages(req: Request, res: Response, next: NextFunction) {
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

export const indexHawkerCentreFuncs = [indexHawkerCentre];
export const showHawkerCentreFuncs = [retrieveHawkerCentre, showHawkerCentre];
export const createHawkerCentreFuncs = [createHawkerCentre];
export const updateHawkerCentreFuncs = [retrieveHawkerCentre, updateHawkerCentre];
export const destroyHawkerCentreFuncs = [retrieveHawkerCentre, destroyHawkerCentre];
export const uploadHawkerCentreImagesFuncs = [
  retrieveHawkerCentre,
  upload.array(UPLOAD_FORM_FIELD, MAX_NUM_IMAGES),
  uploadFormImgs,
  uploadHawkerCentreImages,
];
export const destroyHawkerCentreImagesFuncs = [destroyHawkerCentreImages];
