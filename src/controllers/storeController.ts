import Store from '../models/Store';
import {Request, Response} from 'express';

export async function indexStore() {}

export async function showStore(req: Request, res: Response) {
  const store = await Store.findByPk(req.params.id);
  if (store === null) {
    res.status(404);
    return;
  }

  res.status(200).json(store);
}

export async function createStore(req: Request, res: Response) {
  const store = await Store.create(req.body);
  res.status(201).json(store);
}

export async function updateStore() {}

export async function destroyStore(req: Request, res: Response) {
  const store = await Store.findByPk(req.params.id);
  if (store === null) {
    res.status(404);
    return;
  }

  await store.destroy();
  res.status(200);
}
