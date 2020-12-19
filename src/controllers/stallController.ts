import { Request, Response, NextFunction } from 'express';
import { upload, sendUploadToGCS, createImages } from './imageController';

import Stall from '../models/Stall';
import HawkerCentre from '../models/HawkerCentre';
import { NotFoundError } from '../errors/httpErrors';

import { MAX_NUM_IMAGES, UPLOAD_FORM_FIELD } from '../consts';

function getStallInclude() {
  return [
    { association: Stall.associations.Products },
    { association: Stall.associations.Images, attributes: ['id', 'downloadUrl'] },
    {
      association: Stall.associations.HawkerCentre,
      include: [HawkerCentre.associations.Region],
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

export const indexStallFuncs = [indexStall];
export const showStallFuncs = [retrieveStall, showStall];
export const createStallFuncs = [createStall];
export const updateStallFuncs = [retrieveStall, updateStall];
export const destroyStallFuncs = [retrieveStall, destroyStall];
export const uploadStallImagesFuncs = [
  upload.array(UPLOAD_FORM_FIELD, MAX_NUM_IMAGES),
  sendUploadToGCS,
  createImages,
  retrieveStall,
  uploadStallImages,
];
