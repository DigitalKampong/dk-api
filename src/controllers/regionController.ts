import Region from '../models/Region';
import { Request, Response, NextFunction } from 'express';

async function postIdFormatting(req: Request, res: Response, next: NextFunction) {
  try {
    const region = { id: req.body['regionId'], ...req.body };
    delete region['regionId'];
    req.body = region;
    next();
  } catch (err) {
    next(err);
  }
}

async function getIdFormatting(req: Request, res: Response, next: NextFunction) {
  try {
    let plainRegion = JSON.parse(JSON.stringify(req.region));
    plainRegion = { regionId: plainRegion['id'], ...plainRegion };
    delete plainRegion['id'];

    req.body = plainRegion;
    next();
  } catch (err) {
    next(err);
  }
}

async function getMultipleIdFormatting(req: Request, res: Response, next: NextFunction) {
  try {
    const changedKeys = req.body.map((x: Region) => {
      let plainRegion = JSON.parse(JSON.stringify(x));
      plainRegion = { regionId: plainRegion['id'], ...plainRegion };
      delete plainRegion['id'];
      return plainRegion;
    });

    res.status(201).json(changedKeys);
  } catch (err) {
    next(err);
  }
}

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
    req.body = regions;
    next();
  } catch (err) {
    next(err);
  }
}

async function showRegion(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.body);
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

export const indexRegionFuncs = [indexRegion, getMultipleIdFormatting];
export const showRegionFuncs = [retrieveRegion, getIdFormatting, showRegion];
export const createRegionFuncs = [postIdFormatting, createRegion];
export const updateRegionFuncs = [retrieveRegion, postIdFormatting, updateRegion];
export const destroyRegionFuncs = [retrieveRegion, destroyRegion];
