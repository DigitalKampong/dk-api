import { Request, Response, NextFunction } from 'express';
import * as csv from 'fast-csv';
import path from 'path';
import fs from 'fs';
import Category, { CategoryCreationAttributes } from '../models/Category';
import CategoryStall, { CategoryStallCreationAttributes } from '../models/CategoryStall';
import HawkerCentre, { HawkerCentreCreationAttributes } from '../models/HawkerCentre';
import Image from '../models/Image';
import Product, { ProductCreationAttributes } from '../models/Product';
import Region, { RegionCreationAttributes } from '../models/Region';
import Stall, { StallCreationAttributes } from '../models/Stall';
import { updateLatLngAndRegionId } from '../db/seeds/UpdateHawkerCentre';

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
    const data = await retrieveDataFromCsv('Categories.csv', ['name']);
    await Category.bulkCreate(data as CategoryCreationAttributes[]);
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
    const data = await retrieveDataFromCsv('CategoryStalls.csv', ['stallId', 'categoryId']);
    await CategoryStall.bulkCreate(data as CategoryStallCreationAttributes[]);
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
    await updateLatLngAndRegionId();
    const data = await retrieveDataFromCsv('HawkerCentres.csv', [
      'name',
      'address',
      'regionId',
      'latLng',
    ]);
    await HawkerCentre.bulkCreate(data as HawkerCentreCreationAttributes[]);
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
    const data = await retrieveDataFromCsv('Products.csv', [
      'name',
      'stallId',
      'description',
      'price',
    ]);
    await Product.bulkCreate(data as ProductCreationAttributes[]);
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
    const data = await retrieveDataFromCsv('Regions.csv', ['name']);
    await Region.bulkCreate(data as RegionCreationAttributes[]);
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
    const data = await retrieveDataFromCsv('Stalls.csv', [
      'name',
      'description',
      'rating',
      'contactNo',
      'unitNo',
      'hawkerCentreId',
    ]);
    await Stall.bulkCreate(data as StallCreationAttributes[]);
    next();
  } catch (err) {
    next(err);
  }
}

async function resetComplete(req: Request, res: Response) {
  res.status(200).send('Successfully reset database.');
}

/**
 * Extracts data from .csv
 * @param filename Full file name of the .csv file located at {@code SEEDS_FILE_PATH}.
 * @param headers Customised column names.
 */
async function retrieveDataFromCsv(filename: string, headers: (string | undefined)[]) {
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
