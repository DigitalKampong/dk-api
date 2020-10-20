import Store from '../models/Store';
import {Request, Response, NextFunction} from 'express';

export async function retrieveStore(req: Request, res: Response, next: NextFunction) {
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

export async function indexStore() {}

export async function showStore(req: Request, res: Response) {
  res.status(200).json(req.store);
}

export async function createStore(req: Request, res: Response, next: NextFunction) {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    next(err);
  }
}

export async function updateStore() {}

export async function destroyStore(req: Request, res: Response, next: NextFunction) {
  try {
    await req.store!.destroy();
  } catch (err) {
    next(err);
  }

  res.status(200).end();
}
