import HawkerCentre from '../models/HawkerCentre';
import {Request, Response, NextFunction} from 'express';

// async function postIdFormatting(req: Request, res: Response, next: NextFunction) {
//   try {
//     const hawkerCentre = {id: req.body['hawkerCentreId'], ...req.body};
//     delete hawkerCentre['hawkerCentreId'];
//     req.body = hawkerCentre;
//     next();
//   } catch (err) {
//     next(err);
//   }
// }

// async function getIdFormatting(req: Request, res: Response, next: NextFunction) {
//   try {
//     let plainHawkerCentre = JSON.parse(JSON.stringify(req.hawkerCentre));
//     plainHawkerCentre = {hawkerCentreId: plainHawkerCentre['id'], ...plainHawkerCentre};
//     delete plainHawkerCentre['id'];

//     req.body = plainHawkerCentre;
//     next();
//   } catch (err) {
//     next(err);
//   }
// }

// async function getMultipleIdFormatting(req: Request, res: Response, next: NextFunction) {
//   try {
//     const changedKeys = req.body.map((x: HawkerCentre) => {
//       let plainHawkerCentre = JSON.parse(JSON.stringify(x));
//       plainHawkerCentre = {hawkerCentreId: plainHawkerCentre['id'], ...plainHawkerCentre};
//       delete plainHawkerCentre['id'];
//       return plainHawkerCentre;
//     });

//     res.status(201).json(changedKeys);
//   } catch (err) {
//     next(err);
//   }
// }

async function retrieveHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.findByPk(req.params.id, {
      include: [{association: HawkerCentre.associations.Stalls}],
    });
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

async function indexHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentres = await HawkerCentre.findAll();
    res.status(200).json(hawkerCentres);
  } catch (err) {
    next(err);
  }
}

async function showHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function createHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await HawkerCentre.create(req.body);
    res.status(201).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function updateHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    const hawkerCentre = await req.hawkerCentre!.update(req.body);
    res.status(200).json(hawkerCentre);
  } catch (err) {
    next(err);
  }
}

async function destroyHawkerCentre(req: Request, res: Response, next: NextFunction) {
  try {
    await req.hawkerCentre!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexHawkerCentreFuncs = [indexHawkerCentre];
export const showHawkerCentreFuncs = [retrieveHawkerCentre, showHawkerCentre];
export const createHawkerCentreFuncs = [createHawkerCentre];
export const updateHawkerCentreFuncs = [retrieveHawkerCentre, updateHawkerCentre];
export const destroyHawkerCentreFuncs = [retrieveHawkerCentre, destroyHawkerCentre];
