import Store from '../../models/Store';

declare module 'express' {
  interface Request {
    store?: Store;
  }
}
