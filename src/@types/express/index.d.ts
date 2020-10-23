import HawkerCentre from '../../models/HawkerCentre';
import Region from '../../models/Region';
import Store from '../../models/Store';
import Product from '../../models/Product';

declare module 'express' {
  interface Request {
    hawkerCentre?: HawkerCentre;
    region?: Region;
    store?: Store;
    product?: Product;
  }
}
