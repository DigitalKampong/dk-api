import { Models } from '../../types/';

export function associate(models: Models) {
  const { Category, HawkerCentre, Image, Product, Region, Review, Stall, User, Favourite } = models;

  Category.belongsToMany(Stall, { through: 'CategoryStalls', foreignKey: 'categoryId' });

  HawkerCentre.belongsTo(Region, { foreignKey: 'regionId' });
  HawkerCentre.hasMany(Stall, { foreignKey: 'hawkerCentreId' });
  HawkerCentre.hasMany(Image, { foreignKey: 'hawkerCentreId' });

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
  Stall.hasMany(Favourite, { foreignKey: 'stallId' });

  User.hasMany(Review, { foreignKey: 'userId' });
  User.hasMany(Favourite, { foreignKey: 'userId' });

  Favourite.belongsTo(Stall, { foreignKey: 'stallId' });
  Favourite.belongsTo(User, { foreignKey: 'stallId' });
}
