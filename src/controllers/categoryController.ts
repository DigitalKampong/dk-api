import { Request, Response, NextFunction } from 'express';
import { Category } from '../models';
import { NotFoundError } from '../errors/httpErrors';

async function retrieveCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ association: Category.associations.Stalls }],
    });
    if (category === null) {
      throw new NotFoundError('Category cannot be found');
    }
    req.category = category;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}

async function showCategory(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.category);
  } catch (err) {
    next(err);
  }
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryId = (await Category.create(req.body)).id;
    const category = await Category.findByPk(categoryId, {
      include: [{ association: Category.associations.Stalls }],
    });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await req.category!.update(req.body);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
}

async function destroyCategory(req: Request, res: Response, next: NextFunction) {
  try {
    await req.category!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexCategoryFuncs = [indexCategory];
export const showCategoryFuncs = [retrieveCategory, showCategory];
export const createCategoryFuncs = [createCategory];
export const updateCategoryFuncs = [retrieveCategory, updateCategory];
export const destroyCategoryFuncs = [retrieveCategory, destroyCategory];
