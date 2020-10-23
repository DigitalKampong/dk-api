import HawkerCentre from '../../models/HawkerCentre';
import Region from '../../models/Region';
import Store from '../../models/Store';

declare module 'express' {
  interface Request {
    hawkerCentre?: HawkerCentre;
    region?: Region;
    store?: Store;
  }
}
