import { Express } from 'express';
import HawkerCentre from '../../models/HawkerCentre';
import Region from '../../models/Region';
import Stall from '../../models/Stall';
import Product from '../../models/Product';

declare module 'express' {
  interface Request {
    hawkerCentre?: HawkerCentre;
    region?: Region;
    stall?: Stall;
    product?: Product;

    file?: Express.Multer.File;
    files?: Express.Multer.File[];
    downloadUrls?: string[];
  }
}
