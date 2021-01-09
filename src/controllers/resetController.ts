import { Request, Response, NextFunction } from 'express';
import * as csv from 'fast-csv';
import path from 'path';
import fs from 'fs';
import inflection from 'inflection';
import { Transaction } from 'sequelize/types';

import sequelize from '../db';
import models from '../models';
import Image from '../models/Image';
import Product from '../models/Product';
import Stall from '../models/Stall';
import { truncateClazzes } from '../utils/dbUtil';
import { uploadDiskImg, destroyImages, createImages } from '../controllers/imageController';

const SEEDS_FILE_PATH = '../db/seeds/';
const SAMPLE_IMG_FILE_PATH = path.resolve(__dirname, SEEDS_FILE_PATH, 'cat.jpg');

interface StaticModel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bulkCreate(data: any, options: any): void;
}

async function seedClazz(clazzName: string, t?: Transaction) {
  const filename = `${inflection.pluralize(clazzName)}.csv`;
  const filepath = path.resolve(__dirname, SEEDS_FILE_PATH, filename);

  await fs.promises.access(filepath);
  const data = await retrieveDataFromCsv(filepath);
  const clazz = models[clazzName] as unknown;
  await (clazz as StaticModel).bulkCreate(data, { transaction: t });
}

async function createSampleImages(nImages: number, t: Transaction) {
  const filepath = SAMPLE_IMG_FILE_PATH;

  const promises = [];
  for (let i = 0; i < nImages; i++) {
    promises.push(uploadDiskImg(filepath));
  }

  const names = await Promise.all(promises);
  return await createImages(names, { transaction: t });
}

async function seedInitData(t: Transaction) {
  // This function contains data that always need to be seeded on init of db. e.g. superadmin or regions
  await seedClazz('Region', t);
}

async function seedDevData(t: Transaction) {
  // Fake data that is used for development
  // Due to fk constraints, we need to seed in a specific manner
  await seedClazz('HawkerCentre', t);
  await seedClazz('Category', t);
  await seedClazz('Stall', t);
  await seedClazz('CategoryStall', t);
  await seedClazz('Product', t);
}

async function reset(req: Request, res: Response, next: NextFunction) {
  try {
    await sequelize.transaction(async t => {
      // Remove gcp images manually
      const images = await Image.findAll({ transaction: t });
      await destroyImages(images, { transaction: t });
    });

    // Cannot do sequelize.sync({ force: true }) because we got _search fields that are created through migrations
    await truncateClazzes();

    await sequelize.transaction(async t => {
      await seedInitData(t);
      await seedDevData(t);

      // Add sample img to every product and stall
      const products = await Product.findAll({ transaction: t });
      const stalls = await Stall.findAll({ transaction: t });
      const images = await createSampleImages(products.length + stalls.length, t);

      let imgIdx = 0;
      for (const p of products) {
        await p.addImage(images[imgIdx], { transaction: t });
        imgIdx++;
      }

      for (const s of stalls) {
        await s.addImage(images[imgIdx], { transaction: t });
        imgIdx++;
      }
    });

    res.status(200).send('Successfully reset database.');
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
