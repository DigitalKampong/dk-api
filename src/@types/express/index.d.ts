import HawkerCentre from '../../models/HawkerCentre';
import Region from '../../models/Region';
import Stall from '../../models/Stall';
import Product from '../../models/Product';
import Image from '../../models/Image';

declare module 'express' {
  interface Request {
    hawkerCentre?: HawkerCentre;
    region?: Region;
    stall?: Stall;
    product?: Product;
    images?: Image[];

    // file?: Express.Multer.File;
    // files?: Express.Multer.File[];
    downloadUrls?: string[];
  }
}
