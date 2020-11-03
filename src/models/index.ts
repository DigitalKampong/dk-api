import fs from 'fs';
import path from 'path';
import {Model} from 'sequelize/types';

const basename = path.basename(__filename);
const models: {[Key: string]: Model} = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      // exclude out build artifacts
      file.indexOf('.') !== 0 &&
      file !== basename &&
      !file.endsWith('d.ts') &&
      !file.endsWith('.map')
    );
  })
  .forEach(file => {
    const clazzName = file.substring(0, file.length - 3); // remove .ts or .js from the back
    const model = require(path.join(__dirname, clazzName)); // this is the class
    models[model.default.name] = model.default; // we export default from our models
  });

export default models;
