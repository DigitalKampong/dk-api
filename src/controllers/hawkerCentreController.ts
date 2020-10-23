import HawkerCentre from '../models/HawkerCentre';
import {Request, Response, NextFunction} from 'express';

async function retrieveHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.findByPk(req.params.id);
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
    const hawkerCentres = await HawkerCentre.findAll();
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

export const indexHawkerCentreFuncs = [indexHawkerCentre];
export const showHawkerCentreFuncs = [retrieveHawkerCentre, showHawkerCentre];
export const createHawkerCentreFuncs = [createHawkerCentre];
export const updateHawkerCentreFuncs = [retrieveHawkerCentre, updateHawkerCentre];
export const destroyHawkerCentreFuncs = [retrieveHawkerCentre, destroyHawkerCentre];
