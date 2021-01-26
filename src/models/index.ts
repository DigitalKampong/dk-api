import fs from 'fs';
import path from 'path';
import { Models } from '../types';
import { addScopes } from './init/addScopes';
import { associate } from './init/associations';

const basename = path.basename(__filename);
const models: Models = {};

fs.readdirSync(__dirname)
  .filter(file => {
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

// For some reason, when we pass the class itself, the modifications (e.g. associations and scoping) to the class is retained.
// There is a good chance the class is already in the "global" scope.
associate(models);
addScopes(models);

export { default as Category } from './Category';
export { default as CategoryStall } from './CategoryStall';
export { default as HawkerCentre } from './HawkerCentre';
export { default as Image } from './Image';
export { default as Product } from './Product';
export { default as Region } from './Region';
export { default as Review } from './Review';
export { default as Stall } from './Stall';
export { default as User } from './User';

export default models;
