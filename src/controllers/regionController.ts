import Region from '../models/Region';
import {Request, Response, NextFunction} from 'express';

async function retrieveRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const region = await Region.findByPk(req.params.id);
    if (region === null) {
      res.status(404).end();
      return;
    }
    req.region = region;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const regions = await Region.findAll();
    res.status(200).json(regions);
  } catch (err) {
    next(err);
  }
}

async function showRegion(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.region);
  } catch (err) {
    next(err);
  }
}

async function createRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const region = await Region.create(req.body);
    res.status(201).json(region);
  } catch (err) {
    next(err);
  }
}

async function updateRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const region = await req.region!.update(req.body);
    res.status(200).json(region);
  } catch (err) {
    next(err);
  }
}

async function destroyRegion(req: Request, res: Response, next: NextFunction) {
  try {
    await req.region!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexRegionFuncs = [indexRegion];
export const showRegionFuncs = [retrieveRegion, showRegion];
export const createRegionFuncs = [createRegion];
export const updateRegionFuncs = [retrieveRegion, updateRegion];
export const destroyRegionFuncs = [retrieveRegion, destroyRegion];
