import fs from 'fs';
import path from 'path';
import { Model } from 'sequelize/types';
import { associate } from './init/associations';

const basename = path.basename(__filename);
const models: { [Key: string]: typeof Model } = {};

fs.readdirSync(__dirname)
  .filter(file => {
    // console.log(file);
    return (
      // exclude out build artifacts and init folder
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file !== 'init' &&
      !file.endsWith('d.ts') &&
      !file.endsWith('.map')
    );
  })
  .forEach(file => {
    const clazzName = file.substring(0, file.length - 3); // remove .ts or .js from the back
    const model = require(path.join(__dirname, clazzName)); // this is the class
    models[model.default.name] = model.default; // we export default from our models
  });

// import Category from './Category';
// import CategoryStall from './CategoryStall';
// import HawkerCentre from './HawkerCentre';
// import Image from './Image';
// import Product from './Product';
// import Region from './Region';
// import Review from './Review';
// import Stall from './Stall';
// import User from './User';

// const models = {
//   Category: Category,
//   CategoryStall: CategoryStall,
//   HawkerCentre: HawkerCentre,
//   Image: Image,
//   Product: Product,
//   Region: Region,
//   Review: Review,
//   Stall: Stall,
//   User: User,
// };

associate(models);

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
