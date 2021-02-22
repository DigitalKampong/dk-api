import { Request, Response, NextFunction } from 'express';

async function indexFavourite(req: Request, res: Response, next: NextFunction) {
  res.status(200).json("ok");
}

async function destroyFavourite(req: Request, res: Response, next: NextFunction) {
  res.status(200).json("ok");
}

export const indexFavouriteFuncs = [indexFavourite];
export const destroyFavouriteFuncs = [destroyFavourite];
