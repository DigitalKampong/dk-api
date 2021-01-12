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

import { Models } from '../../types/';

// type ModelStatic = typeof Model & {
//   new (values?: object, options?: Sequelize.BuildOptions): Model;
// };

export function associate(models: Models) {
  const { Category, HawkerCentre, Image, Product, Region, Review, Stall, User } = models;

  Category.belongsToMany(Stall, { through: 'CategoryStalls', foreignKey: 'categoryId' });

  HawkerCentre.belongsTo(Region, { foreignKey: 'regionId' });
  HawkerCentre.hasMany(Stall, { foreignKey: 'hawkerCentreId' });

  Product.belongsTo(Stall, { foreignKey: 'stallId' });
  Product.hasMany(Image, { foreignKey: 'productId' });

  Region.hasMany(HawkerCentre, { foreignKey: 'regionId' });

  Review.belongsTo(Stall, { foreignKey: 'stallId' });
  Review.belongsTo(User, { foreignKey: 'userId' });

  Stall.belongsTo(HawkerCentre, { foreignKey: 'hawkerCentreId' });
  Stall.belongsToMany(Category, { through: 'CategoryStalls', foreignKey: 'stallId' });
  Stall.hasMany(Image, { foreignKey: 'stallId' });
  Stall.hasMany(Product, { foreignKey: 'stallId', onDelete: 'cascade', hooks: true });
  Stall.hasMany(Review, { foreignKey: 'stallId' });

  User.hasMany(Review, { foreignKey: 'userId' });
}

// Stall.hasMany(Product, { foreignKey: 'stallId', onDelete: 'cascade', hooks: true });
// Product.belongsTo(Stall, { foreignKey: 'stallId' });

// Stall.hasMany(Image, { foreignKey: 'stallId' });

// Stall.belongsToMany(Category, { through: 'CategoryStalls', foreignKey: 'stallId' });
// Category.belongsToMany(Stall, { through: 'CategoryStalls', foreignKey: 'categoryId' });

// Stall.hasMany(Review, { foreignKey: 'stallId' });
// Review.belongsTo(Stall, { foreignKey: 'stallId' });

// Stall.addScope('asdf', { include: [{ association: Stall.associations.Categories }] });
