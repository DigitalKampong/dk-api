import Store from '../models/Store';
import {Request, Response, NextFunction} from 'express';

async function retrieveStore(req: Request, res: Response, next: NextFunction) {
  try {
    const store = await Store.findByPk(req.params.id);
    if (store === null) {
      res.status(404).end();
      return;
    }
    req.store = store;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexStore(req: Request, res: Response, next: NextFunction) {
  try {
    const stores = await Store.findAll();
    res.status(200).json(stores);
  } catch (err) {
    next(err);
  }
}

async function showStore(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.store);
  } catch (err) {
    next(err);
  }
}

async function createStore(req: Request, res: Response, next: NextFunction) {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    next(err);
  }
}

async function updateStore(req: Request, res: Response, next: NextFunction) {
  try {
    const store = await req.store!.update(req.body);
    res.status(200).json(store);
  } catch (err) {
    next(err);
  }
}

async function destroyStore(req: Request, res: Response, next: NextFunction) {
  try {
    await req.store!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexStoreFuncs = [indexStore];
export const showStoreFuncs = [retrieveStore, showStore];
export const createStoreFuncs = [createStore];
export const updateStoreFuncs = [retrieveStore, updateStore];
export const destroyStoreFuncs = [retrieveStore, destroyStore];
