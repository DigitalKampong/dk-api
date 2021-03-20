import HawkerCentre from '../../models/HawkerCentre';
import Region from '../../models/Region';
import Stall from '../../models/Stall';
import Product from '../../models/Product';
import Image from '../../models/Image';
import Category from '../../models/Category';
import CategoryStall from '../../models/CategoryStall';
import User from '../../models/User';
import Review from '../../models/Review';
import SecurityQuestion from '../../models/SecurityQuestion';
import UserAnswer from '../../models/UserAnswer';

declare module 'express' {
  interface Request {
    hawkerCentre?: HawkerCentre;
    region?: Region;
    stall?: Stall;
    product?: Product;
    category?: Category;
    categoryStall?: CategoryStall;
    review?: Review;

    user?: User;

    stalls?: Stall[];
    stallIds?: number[];

    images?: Image[];
    fileNames?: string[];

    securityQuestion?: SecurityQuestion;
    userAnswer?: UserAnswer;
  }
}
