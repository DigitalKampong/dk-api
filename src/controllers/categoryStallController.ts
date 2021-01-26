import { Request, Response, NextFunction } from 'express';
import { CategoryStall } from '../models';
import { NotFoundError } from '../errors/httpErrors';

async function retrieveCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryStall = await CategoryStall.findByPk(req.params.id);
    if (categoryStall === null) {
      throw new NotFoundError('CategoryStall cannot be found');
    }
    req.categoryStall = categoryStall;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryStalls = await CategoryStall.findAll();
    res.status(200).json(categoryStalls);
  } catch (err) {
    next(err);
  }
}

async function showCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.categoryStall);
  } catch (err) {
    next(err);
  }
}

async function createCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryStallId = (await CategoryStall.create(req.body)).id;
    const categoryStall = await CategoryStall.findByPk(categoryStallId);
    res.status(201).json(categoryStall);
  } catch (err) {
    next(err);
  }
}

async function updateCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryStall = await req.categoryStall!.update(req.body);
    res.status(200).json(categoryStall);
  } catch (err) {
    next(err);
  }
}

async function destroyCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    await req.categoryStall!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexCategoryStallFuncs = [indexCategoryStall];
export const showCategoryStallFuncs = [retrieveCategoryStall, showCategoryStall];
export const createCategoryStallFuncs = [createCategoryStall];
export const updateCategoryStallFuncs = [retrieveCategoryStall, updateCategoryStall];
export const destroyCategoryStallFuncs = [retrieveCategoryStall, destroyCategoryStall];
