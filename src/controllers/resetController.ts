import { Request, Response, NextFunction } from 'express';
import * as csv from 'fast-csv';
import path from 'path';
import fs from 'fs';
import Category from '../models/Category';
import CategoryStall from '../models/CategoryStall';
import HawkerCentre from '../models/HawkerCentre';
import Image from '../models/Image';
import Product from '../models/Product';
import Region from '../models/Region';
import Stall from '../models/Stall';

const SEEDS_FILE_PATH = '../db/seeds/';

async function truncateCategories(req: Request, res: Response, next: NextFunction) {
  try {
    await Category.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function seedCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await retrieveDataFromSeed('Categories.csv', ['name']);
    await Category.bulkCreate(data);
    next();
  } catch (err) {
    next(err);
  }
}

async function truncateCategoryStalls(req: Request, res: Response, next: NextFunction) {
  try {
    await CategoryStall.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function seedCategoryStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await retrieveDataFromSeed('CategoryStalls.csv', ['stallId', 'categoryId']);
    await CategoryStall.bulkCreate(data);
    next();
  } catch (err) {
    next(err);
  }
}

async function truncateHawkerCentres(req: Request, res: Response, next: NextFunction) {
  try {
    await HawkerCentre.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function seedHawkerCentres(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await retrieveDataFromSeed('HawkerCentres.csv', ['name', 'address', 'regionId']);
    await HawkerCentre.bulkCreate(data);
    next();
  } catch (err) {
    next(err);
  }
}

async function truncateImages(req: Request, res: Response, next: NextFunction) {
  try {
    await Image.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function truncateProducts(req: Request, res: Response, next: NextFunction) {
  try {
    await Product.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function seedProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await retrieveDataFromSeed('Products.csv', [
      'name',
      'stallId',
      'description',
      'price',
    ]);
    await Product.bulkCreate(data);
    next();
  } catch (err) {
    next(err);
  }
}

async function truncateRegions(req: Request, res: Response, next: NextFunction) {
  try {
    await Region.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function seedRegions(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await retrieveDataFromSeed('Regions.csv', ['name']);
    await Region.bulkCreate(data);
    next();
  } catch (err) {
    next(err);
  }
}

async function truncateStalls(req: Request, res: Response, next: NextFunction) {
  try {
    await Stall.truncate({
      cascade: true,
      restartIdentity: true,
    });
    next();
  } catch (err) {
    next(err);
  }
}

async function seedStalls(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await retrieveDataFromSeed('Stalls.csv', [
      'name',
      'description',
      'rating',
      'contactNo',
      'unitNo',
      'hawkerCentreId',
    ]);
    await Stall.bulkCreate(data);
    next();
  } catch (err) {
    next(err);
  }
}

async function resetComplete(req: Request, res: Response) {
  res.status(200).send('Successfully reset database.');
}

async function retrieveDataFromSeed(filename: string, headers: (string | undefined)[]) {
  const stream = fs.createReadStream(path.resolve(__dirname, SEEDS_FILE_PATH, filename));
  const data: unknown[] = [];
  await new Promise((resolve, reject) => {
    stream
      .pipe(csv.parse({ headers: headers }))
      .on('error', error => reject(error))
      .on('data', row => data.push(row))
      .on('end', (rowCount: number) => resolve(`Parsed ${rowCount} rows`));
  });
  return data;
}

export const resetFuncs = [
  truncateImages,
  truncateProducts,
  truncateCategoryStalls,
  truncateStalls,
  truncateCategories,
  truncateHawkerCentres,
  truncateRegions,
  seedRegions,
  seedHawkerCentres,
  seedCategories,
  seedStalls,
  seedCategoryStalls,
  seedProducts,
  resetComplete,
];
