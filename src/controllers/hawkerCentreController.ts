import HawkerCentre from '../models/HawkerCentre';
import {Request, Response, NextFunction} from 'express';

async function retrieveHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.findByPk(req.params.id, {
      attributes: [['id', 'hawkerCentreId'], 'name', 'address', 'regionId', 'createdAt', 'updatedAt'],
    });
    if (hawkerCentre === null) {
      res.status(404).end();
      return;
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
      attributes: [['id', 'hawkerCentreId'], 'name', 'address', 'regionId', 'createdAt', 'updatedAt'],
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
    const temp = req.body;
    const newHawkerCentre = {id: temp['hawkerCentreId'], ...temp};
    delete newHawkerCentre['hawkerCentreId'];
    const hawkerCentre = await HawkerCentre.create(newHawkerCentre);
    res.status(201).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function updateHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.body;
    const updatedHawkerCentre = {id: temp['hawkerCentreId'], ...temp};
    delete updatedHawkerCentre['hawkerCentreId'];
    const hawkerCentre = await req.hawkerCentre!.update(updatedHawkerCentre);

    res.status(200).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function destroyHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.hawkerCentre;
    const id = temp!.getDataValue('hawkerCentreId');
    await HawkerCentre.destroy({where: {id}});
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
