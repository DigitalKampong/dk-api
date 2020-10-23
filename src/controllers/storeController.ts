import {Request, Response, NextFunction} from 'express';
import Store from '../models/Store';
import HawkerCentre from '../models/HawkerCentre';
import {assert} from 'console';

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

async function retrieveHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const store = req.store;
    assert(store !== undefined);
    const hawkerCentreId = store?.hawkerCentreId;
    const hawkerCentre = await HawkerCentre.findByPk(hawkerCentreId);
    if (hawkerCentre === null) {
      res.status(404).end();
      return;
    }
    req.hawkerCentre = hawkerCentre;
    next();
  } catch (err) {
    next(err);
  }
}

async function showStoreInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const store = req.store;
    const hawkerCentre = req.hawkerCentre;
    assert(store !== undefined && hawkerCentre !== undefined);
    const info = {
      name: store?.name,
      description: store?.description,
      contactNo: store?.contactNo,
      address: hawkerCentre?.address,
      unitNo: store?.unitNo,
    };
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
}

export const indexStoreFuncs = [indexStore];
export const showStoreFuncs = [retrieveStore, showStore];
export const createStoreFuncs = [createStore];
export const updateStoreFuncs = [retrieveStore, updateStore];
export const destroyStoreFuncs = [retrieveStore, destroyStore];
export const showStoreInfoFuncs = [retrieveStore, retrieveHawkerCentre, showStoreInfo];
