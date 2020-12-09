import Stall from '../models/Stall';
import {Request, Response, NextFunction} from 'express';

// async function postIdFormatting(req: Request, res: Response, next: NextFunction) {
//   try {
//     const stall = {id: req.body['stallId'], ...req.body};
//     delete stall['stallId'];
//     req.body = stall;
//     next();
//   } catch (err) {
//     next(err);
//   }
// }

// async function getIdFormatting(req: Request, res: Response, next: NextFunction) {
//   try {
//     let plainStall = JSON.parse(JSON.stringify(req.stall));
//     plainStall = {stallId: plainStall['id'], ...plainStall};
//     delete plainStall['id'];

//     req.body = plainStall;
//     next();
//   } catch (err) {
//     next(err);
//   }
// }

// async function getMultipleIdFormatting(req: Request, res: Response, next: NextFunction) {
//   try {
//     const changedKeys = req.body.map((x: Stall) => {
//       let plainStall = JSON.parse(JSON.stringify(x));
//       plainStall = {stallId: plainStall['id'], ...plainStall};
//       delete plainStall['id'];
//       return plainStall;
//     });

//     res.status(201).json(changedKeys);
//   } catch (err) {
//     next(err);
//   }
// }

async function retrieveStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await Stall.findByPk(req.params.id);
    if (stall === null) {
      res.status(404).end();
      return;
    }
    req.stall = stall;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stalls = await Stall.findAll();
    req.body = stalls;
    next();
  } catch (err) {
    next(err);
  }
}

async function showStall(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.body);
  } catch (err) {
    next(err);
  }
}

async function createStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await Stall.create(req.body);
    res.status(201).json(stall);
  } catch (err) {
    next(err);
  }
}

async function updateStall(req: Request, res: Response, next: NextFunction) {
  try {
    const stall = await req.stall!.update(req.body);
    res.status(200).json(stall);
  } catch (err) {
    next(err);
  }
}

async function destroyStall(req: Request, res: Response, next: NextFunction) {
  try {
    await req.stall!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexStallFuncs = [indexStall];
export const showStallFuncs = [retrieveStall, showStall];
export const createStallFuncs = [createStall];
export const updateStallFuncs = [retrieveStall, updateStall];
export const destroyStallFuncs = [retrieveStall, destroyStall];
