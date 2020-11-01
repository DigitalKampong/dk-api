import {Request, Response, NextFunction} from 'express';
import HawkerCentre from '../models/HawkerCentre';
import Stall from '../models/Stall';

async function retrieveStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await Stall.findByPk(req.params.id, {
      include: [{model: HawkerCentre, attributes: ['name', 'address']}],
      attributes: [
        ['id', 'stallId'],
        'name',
        'description',
        'contactNo',
        'unitNo',
        'hawkerCentreId',
        'createdAt',
        'updatedAt',
      ],
    });
    if (stall === null) {
      res.status(404).end();
      return;
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
      attributes: [
        ['id', 'stallId'],
        'name',
        'description',
        'contactNo',
        'unitNo',
        'hawkerCentreId',
        'createdAt',
        'updatedAt',
      ],
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
    const temp = req.body;
    const newStall = {id: temp['stallId'], ...temp};
    delete newStall['stallId'];
    const stall = await Stall.create(newStall);
    res.status(201).json(stall);
  } catch (err) {
    next(err);
  }
}

async function updateStall(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.body;
    const updatedStall = {id: temp['stallId'], ...temp};
    delete updatedStall['stallId'];
    const stall = await req.stall!.update(updatedStall);
    res.status(200).json(stall);
  } catch (err) {
    next(err);
  }
}

async function destroyStall(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.stall;
    const id = temp!.getDataValue('stallId');
    await Stall.destroy({where: {id}});
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexStallFuncs = [indexStall];
export const showStallFuncs = [retrieveStall, showStall];
export const createStallFuncs = [createStall];
export const updateStallFuncs = [retrieveStall, updateStall];
export const destroyStallFuncs = [retrieveStall, destroyStall];
