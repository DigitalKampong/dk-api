import Store from '../models/Store';
import {Request, Response} from 'express';

export async function retrieveStore(req: StoreReq, res: Response, next: Function) {
  const store = await Store.findByPk(req.params.id);
  if (store === null) {
    res.status(404);
    return;
  }

  req.store = store;
  next();
}

export async function indexStore() {}

export async function showStore(req: StoreReq, res: Response) {
  res.status(200).json(req.store);
}

export async function createStore(req: StoreReq, res: Response) {
  const store = await Store.create(req.body);
  res.status(201).json(store);
}

export async function updateStore() {}

export async function destroyStore(req: StoreReq, res: Response) {
  await req.store.destroy();
  res.status(200);
}
