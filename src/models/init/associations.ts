// import Category from '../Category';
// import CategoryStall from '../CategoryStall';
// import HawkerCentre from '../HawkerCentre';
// import Image from '../Image';
// import Product from '../Product';
// import Region from '../Region';
// import Review from '../Review';
// import Stall from '../Stall';
// import User form '../User';

// import {
//   Category,
//   CategoryStall,
//   HawkerCentre,
//   Image,
//   Product,
//   Region,
//   Review,
//   Stall,
//   User,
// } from '../index';

import { Model } from 'sequelize/types';

export function associate(models: { [Key: string]: typeof Model }) {
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

  Stall.hasMany(Product, { foreignKey: 'stallId', onDelete: 'cascade', hooks: true });
  Product.belongsTo(Stall, { foreignKey: 'stallId' });

  Stall.hasMany(Image, { foreignKey: 'stallId' });

  Stall.belongsToMany(Category, { through: 'CategoryStalls', foreignKey: 'stallId' });
  Category.belongsToMany(Stall, { through: 'CategoryStalls', foreignKey: 'categoryId' });

  Stall.hasMany(Review, { foreignKey: 'stallId' });
  Review.belongsTo(Stall, { foreignKey: 'stallId' });

  Stall.addScope('asdf', { include: [{ association: Stall.associations.Categories }] });
}

// Stall.hasMany(Product, { foreignKey: 'stallId', onDelete: 'cascade', hooks: true });
// Product.belongsTo(Stall, { foreignKey: 'stallId' });

// Stall.hasMany(Image, { foreignKey: 'stallId' });

// Stall.belongsToMany(Category, { through: 'CategoryStalls', foreignKey: 'stallId' });
// Category.belongsToMany(Stall, { through: 'CategoryStalls', foreignKey: 'categoryId' });

// Stall.hasMany(Review, { foreignKey: 'stallId' });
// Review.belongsTo(Stall, { foreignKey: 'stallId' });

// Stall.addScope('asdf', { include: [{ association: Stall.associations.Categories }] });
