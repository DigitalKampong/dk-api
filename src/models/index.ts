import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const models = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename;
  })
  .forEach(file => {
    const clazzName = file.substring(0, file.length - 3);
    const model = require(path.join(__dirname, clazzName)); // this is the class
    models[model.default.name] = model.default; // we export default from our models
  });

export default models;
