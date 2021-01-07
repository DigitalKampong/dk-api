import { Request, Response, NextFunction } from 'express';
import * as csv from 'fast-csv';
import path from 'path';
import fs from 'fs';
import inflection from 'inflection';

import Category, { CategoryCreationAttributes } from '../models/Category';
import CategoryStall, { CategoryStallCreationAttributes } from '../models/CategoryStall';
import HawkerCentre, { HawkerCentreCreationAttributes } from '../models/HawkerCentre';
import Product, { ProductCreationAttributes } from '../models/Product';
import Region, { RegionCreationAttributes } from '../models/Region';
import Stall, { StallCreationAttributes } from '../models/Stall';
import sequelize from '../db';
import models from '../models';

const SEEDS_FILE_PATH = '../db/seeds/';

// async function seedCategories(t?: Transaction) {
//   const data = await retrieveDataFromCsv('Categories.csv');
//   await Category.bulkCreate(data as CategoryCreationAttributes[], {
//     transaction: t
//   });
// }

// async function seedCategoryStalls() {
//   const data = await retrieveDataFromCsv('CategoryStalls.csv');
//   await CategoryStall.bulkCreate(data as CategoryStallCreationAttributes[]);
// }

// async function seedHawkerCentres() {
//   const data = await retrieveDataFromCsv('HawkerCentres.csv');
//   await HawkerCentre.bulkCreate(data as HawkerCentreCreationAttributes[]);
// }

// async function seedProducts() {
//   const data = await retrieveDataFromCsv('Products.csv');
//   await Product.bulkCreate(data as ProductCreationAttributes[]);
// }

// async function seedRegions() {
//   const data = await retrieveDataFromCsv('Regions.csv');
//   await Region.bulkCreate(data as RegionCreationAttributes[]);
// }

// async function seedStalls() {
//   const data = await retrieveDataFromCsv('Stalls.csv');
//   await Stall.bulkCreate(data as StallCreationAttributes[]);
// }

// async function resetComplete(req: Request, res: Response) {
//   res.status(200).send('Successfully reset database.');
// }


interface StaticModel {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  truncate(options: any): void;
  bulkCreate(data: any, options: any): void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

async function seedClazz(clazzName: string, t?: Transaction) {
  const filename = `${inflection.pluralize(clazzName)}.csv`;
  const filepath = path.resolve(__dirname, SEEDS_FILE_PATH, filename);

  await fs.promises.access(filepath);
  const data = await retrieveDataFromCsv(filepath);
  await (models[clazzName] as StaticModel).bulkCreate(data, { transaction: t });
}

async function truncateClazzes() {
  Object.keys(models).forEach(async key => {
    // Cast to unknown then to StaticModel for tsc to work
    const clazz: unknown = models[key];
    await (clazz as StaticModel).truncate({
      cascade: true,
      restartIdentity: true,
    });
  });
}

async function seedInitData(t: Transaction) {
  // This function contains data that always need to be seeded on init of db. e.g. superadmin or regions
  await seedClazz('Region', t);
  await seedClazz('HawkerCentre', t);
  await seedClazz('Category', t);
}

async function seedDevData(t: Transaction) {
  // Fake data that is only used for development
  await seedClazz('Stall', t);
  await seedClazz('CategoryStall', t);
  await seedClazz('Product', t);
}

async function reset(req: Request, res: Response, next: NextFunction) {
  try {
    await sequelize.transaction(async t => {
      // Remove gcp images manually
      // const images = await Image.findAll({ transaction: t });
      // await destroyImages(images, t);
    })

    // Cannot do sequelize.sync({ force: true }) because we got _search
    // fields in tables that cannot be easily emulated by sequelize
    await truncateClazzes();

    await sequelize.transaction(async t => {
    // // Due to fk constraints, we need to recreate the tables in a specific order
      await seedInitData(t);
      res.status(200).send('Successfully reset database.');
    })

  } catch (err) {
    next(err);
  }

}

/**
 * Extracts data from .csv
 * @param filepath Full file path of the .csv file located at {@code SEEDS_FILE_PATH}.
 * @param headers Customised column names.
 */
async function retrieveDataFromCsv(filepath: string) {
  const stream = fs.createReadStream(filepath);
  const data: unknown[] = [];
  await new Promise((resolve, reject) => {
    stream
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', row => data.push(row))
      .on('end', (rowCount: number) => resolve(`Parsed ${rowCount} rows`));
  });
  return data;
}

export const resetFuncs = [reset];
