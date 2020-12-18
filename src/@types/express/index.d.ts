import HawkerCentre from '../../models/HawkerCentre';
import Region from '../../models/Region';
import Stall from '../../models/Stall';
import Product from '../../models/Product';
import Image from '../../models/Image';
import Category from '../../models/Category';
import CategoryStall from '../../models/CategoryStall';

declare module 'express' {
  interface Request {
    hawkerCentre?: HawkerCentre;
    region?: Region;
    stall?: Stall;
    product?: Product;
    category?: Category;
    categoryStall?: CategoryStall;

    images?: Image[];
    downloadUrls?: string[];
  }
}
