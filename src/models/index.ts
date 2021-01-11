// import fs from 'fs';
// import path from 'path';
import { ModelStatic } from '../types';
import { addScopes } from './init/addScopes';
import { associate } from './init/associations';

// const basename = path.basename(__filename);
// const models: { [Key: string]: typeof Model } = {};

// fs.readdirSync(__dirname)
//   .filter(file => {
//     // console.log(file);
//     return (
//       // exclude out build artifacts and init folder
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file !== 'init' &&
//       !file.endsWith('d.ts') &&
//       !file.endsWith('.map')
//     );
//   })
//   .forEach(file => {
//     const clazzName = file.substring(0, file.length - 3); // remove .ts or .js from the back
//     const model = require(path.join(__dirname, clazzName)); // this is the class
//     models[model.default.name] = model.default; // we export default from our models
//   });

import Categoryzz from './Category';
import CategoryStallzz from './CategoryStall';
import HawkerCentrezz from './HawkerCentre';
import Imagezz from './Image';
import Productzz from './Product';
import Regionzz from './Region';
import Reviewzz from './Review';
import Stallzz from './Stall';
import Userzz from './User';

// This is done to typecheck correctly for files that import this file.
const models = {
  Category: Categoryzz,
  CategoryStall: CategoryStallzz,
  HawkerCentre: HawkerCentrezz,
  Image: Imagezz,
  Product: Productzz,
  Region: Regionzz,
  Review: Reviewzz,
  Stall: Stallzz,
  User: Userzz,
};

type paramType = { [Key: string]: ModelStatic };

associate(models as paramType);
addScopes(models as paramType);

// Need to do it this way, can't dynamically export from models
const {
  Category,
  CategoryStall,
  HawkerCentre,
  Image,
  Product,
  Region,
  Review,
  Stall,
  User,
} = models;

export { Category, CategoryStall, HawkerCentre, Image, Product, Region, Review, Stall, User };

export default models;
