import { HawkerCentre, Stall } from '../models';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError } from '../errors/httpErrors';

import { upload, uploadFormImgs, createImages, destroyImageIds } from './imageController';
import { fmtStallsResp } from './stallController';
import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';
import sequelize from '../db';
import { Includeable } from 'sequelize/types';

function getHawkerCentreStallsInclude(): Includeable[] {
  return [
    {
      association: Stall.associations.Images,
      attributes: ['id', 'downloadUrl'],
    },
  ];
}

function getHawkerCentreInclude(): Includeable[] {
  return [
    {
      association: HawkerCentre.associations.Stalls,
      include: getHawkerCentreStallsInclude(),
    },
    { association: HawkerCentre.associations.Images, attributes: ['id', 'downloadUrl'] },
  ];
}

function getHawkerCentresInclude(): Includeable[] {
  return [
    { association: HawkerCentre.associations.Region },
    { association: HawkerCentre.associations.Images, attributes: ['id', 'downloadUrl'] },
  ];
}

async function fmtHawkerCentreResp(hawkerCentre: HawkerCentre) {
  let stalls = hawkerCentre.Stalls;

  // It is assumed that if hawkerCentre comes with Stalls,
  // Stalls already has include from getHawkerCentreStallsInclude()
  if (stalls === undefined) {
    stalls = await hawkerCentre.getStalls({ include: getHawkerCentreStallsInclude() });
  }

  // Use the one from stallController, beware of infinite loop when fmtStallsResp uses
  // this method to format its hawkerCentre
  const stallsObj = await fmtStallsResp(stalls);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hcObj: any = hawkerCentre.get({ plain: true });

  hcObj['Stalls'] = stallsObj;
  return hcObj;
}

async function retrieveHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.findByPk(req.params.id, {
      include: getHawkerCentreInclude(),
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
      include: getHawkerCentresInclude(),
    });
    res.status(200).json(hawkerCentres);
  } catch (err) {
    next(err);
  }
}

async function showHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hcResp = await fmtHawkerCentreResp(req.hawkerCentre!);
    res.status(200).json(hcResp);
  } catch (err) {
    next(err);
  }
}

async function createHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.create(req.body);
    const hcResp = await fmtHawkerCentreResp(hawkerCentre);
    res.status(201).json(hcResp);
  } catch (err) {
    next(err);
  }
}

async function updateHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await req.hawkerCentre!.update(req.body);
    const hcResp = await fmtHawkerCentreResp(hawkerCentre);
    res.status(200).json(hcResp);
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
      include: getHawkerCentreInclude(),
    });

    res.status(200).json(await fmtHawkerCentreResp(hawkerCentre));
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
