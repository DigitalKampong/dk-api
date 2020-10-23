import Store from '../../models/Store';
import Product from '../../models/Product';

declare module 'express' {
  interface Request {
    store?: Store;
    product?: Product;
  }
}
