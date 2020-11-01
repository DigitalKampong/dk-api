import Region from '../models/Region';
import {Request, Response, NextFunction} from 'express';

async function retrieveRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const region = await Region.findByPk(req.params.id, {
      attributes: [['id', 'regionId'], 'name', 'createdAt', 'updatedAt'],
    });
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
    const regions = await Region.findAll({
      attributes: [['id', 'regionId'], 'name', 'createdAt', 'updatedAt'],
    });
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
    const temp = req.body;
    const newRegion = {id: temp['regionId'], ...temp};
    delete newRegion['regionId'];
    const region = await Region.create(newRegion);
    res.status(201).json(region);
  } catch (err) {
    next(err);
  }
}

async function updateRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.body;
    const updatedRegion = {id: temp['regionId'], ...temp};
    delete updatedRegion['regionId'];
    const region = await req.region!.update(updatedRegion);
    res.status(200).json(region);
  } catch (err) {
    next(err);
  }
}

async function destroyRegion(req: Request, res: Response, next: NextFunction) {
  try {
    const temp = req.region;
    const id = temp!.getDataValue('regionId');
    await Region.destroy({where: {id}});
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
