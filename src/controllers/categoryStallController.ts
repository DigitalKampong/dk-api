import CategoryStall from '../models/CategoryStall';
import { Request, Response, NextFunction } from 'express';

async function retrieveCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryStall = await CategoryStall.findByPk(req.params.id, {
      include: [
        { association: CategoryStall.associations.Stall },
        { association: CategoryStall.associations.Category },
      ],
    });
    if (categoryStall === null) {
      res.status(404).end();
      return;
    }
    req.categoryStall = categoryStall;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexCategoryStall(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryStalls = await CategoryStall.findAll({
      include: [
        { association: CategoryStall.associations.Stall },
        { association: CategoryStall.associations.Category },
      ],
    });
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
    const categoryStall = await CategoryStall.findByPk(categoryStallId, {
      include: [
        { association: CategoryStall.associations.Stall },
        { association: CategoryStall.associations.Category },
      ],
    });
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
