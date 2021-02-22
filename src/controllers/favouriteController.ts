import { Request, Response, NextFunction } from 'express';
import { Favourite } from '../models';

async function indexFavourite(req: Request, res: Response, next: NextFunction) {
  try {
    const favourites = await Favourite.findAll({
      where: { userId: req.user!.id },
      include: [
        {
          association: Favourite.associations.Stall,
        },
      ],
    });

    res.status(200).json(favourites);
  } catch (err) {
    next(err);
  }
}

async function destroyFavourite(req: Request, res: Response, next: NextFunction) {
  try {
    await Favourite.destroy({
      where: {
        userId: req.user!.id,
        id: req.params.id,
      },
    });

    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexFavouriteFuncs = [indexFavourite];
export const destroyFavouriteFuncs = [destroyFavourite];
