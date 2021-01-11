import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';

import sequelize from '../db';
import Product from './Product';
import HawkerCentre from './HawkerCentre';
import Image from './Image';
import Review from './Review';
import Category from './Category';
import { showCategoryStallFuncs } from '../controllers/categoryStallController';
// import CategoryStall from './CategoryStall';

export interface StallAttributes {
  id: number;
  name: string;
  description: string | null;
  contactNo: string | null;
  rating: number;
  unitNo: string | null;
  hawkerCentreId: number;
}

export interface StallCreationAttributes extends Optional<StallAttributes, 'id'> {}

class Stall extends Model<StallAttributes, StallCreationAttributes> implements StallAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public contactNo!: string | null;
  public unitNo!: string | null;
  public hawkerCentreId!: number;
  public rating!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Stall.belongsTo(HawkerCentre)
  public createHawkerCentre!: BelongsToCreateAssociationMixin<HawkerCentre>;
  public getHawkerCentre!: BelongsToGetAssociationMixin<HawkerCentre>;
  public setHawkerCentre!: BelongsToSetAssociationMixin<HawkerCentre, number>;

  // Stall.hasMany(Product)
  public addProduct!: HasManyAddAssociationMixin<Product, number>;
  public addProducts!: HasManyAddAssociationsMixin<Product, number>;
  public countProducts!: HasManyCountAssociationsMixin;
  public createProducts!: HasManyCreateAssociationMixin<Product>;
  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public hasProduct!: HasManyHasAssociationMixin<Product, number>;
  public hasProducts!: HasManyHasAssociationsMixin<Product, number>;
  public removeProduct!: HasManyRemoveAssociationMixin<Product, number>;
  public removeProducts!: HasManyRemoveAssociationsMixin<Product, number>;
  public setProducts!: HasManySetAssociationsMixin<Product, number>;

  // Stall.hasMany(Image)
  public addImage!: HasManyAddAssociationMixin<Image, number>;
  public addImages!: HasManyAddAssociationsMixin<Image, number>;
  public countImages!: HasManyCountAssociationsMixin;
  public createImage!: HasManyCreateAssociationMixin<Image>;
  public getImages!: HasManyGetAssociationsMixin<Image>;
  public hasImage!: HasManyHasAssociationMixin<Image, number>;
  public hasImages!: HasManyHasAssociationsMixin<Image, number>;
  public removeImage!: HasManyRemoveAssociationMixin<Image, number>;
  public removeImages!: HasManyRemoveAssociationsMixin<Image, number>;
  public setImages!: HasManySetAssociationsMixin<Image, number>;

  // Stall.hasMany(Review)
  public addReview!: HasManyAddAssociationMixin<Review, number>;
  public addReviews!: HasManyAddAssociationsMixin<Review, number>;
  public countReviews!: HasManyCountAssociationsMixin;
  public createReview!: HasManyCreateAssociationMixin<Review>;
  public getReviews!: HasManyGetAssociationsMixin<Review>;
  public hasReview!: HasManyHasAssociationMixin<Review, number>;
  public hasReviews!: HasManyHasAssociationsMixin<Review, number>;
  public removeReview!: HasManyRemoveAssociationMixin<Review, number>;
  public removeReviews!: HasManyRemoveAssociationsMixin<Review, number>;
  public setReviews!: HasManySetAssociationsMixin<Review, number>;

  // Stall.belongsToMany(Category)
  public addCategory!: BelongsToManyAddAssociationMixin<Category, number>;
  public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>;
  public countCategories!: BelongsToManyCountAssociationsMixin;
  public createCategory!: BelongsToManyCreateAssociationMixin<Category>;
  public getCategories!: BelongsToManyGetAssociationsMixin<Category>;
  public hasCategory!: BelongsToManyHasAssociationMixin<Category, number>;
  public hasCategories!: BelongsToManyHasAssociationsMixin<Category, number>;
  public removeCategory!: BelongsToManyRemoveAssociationMixin<Category, number>;
  public removeCategories!: BelongsToManyRemoveAssociationsMixin<Category, number>;
  public setCategories!: BelongsToManySetAssociationsMixin<Category, number>;

  public readonly HawkerCentre?: HawkerCentre;
  public readonly Products?: Product[];
  public readonly Images?: Image[];
  public readonly Reviews?: Review[];
  public readonly Categories?: Category[];

  public static associations: {
    HawkerCentre: Association<Stall, HawkerCentre>;
    Products: Association<Stall, Product>;
    Images: Association<Stall, Image>;
    Reviews: Association<Stall, Review>;
    Categories: Association<Stall, Category>;
  };
}

Stall.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    contactNo: {
      type: DataTypes.STRING,
    },
    unitNo: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.VIRTUAL,
    },
    hawkerCentreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HawkerCentres',
        key: 'id',
      },
    },
    nasty: {
      type: DataTypes.VIRTUAL,
      get() {
        // this assumes that the call includes Categories
        const categories: Category[] = this.getDataValue('Categories');
        return categories.map(cate => cate.name);
      },
    },
  },
  { sequelize }
);

Stall.hasMany(Product, { foreignKey: 'stallId', onDelete: 'cascade', hooks: true });
Product.belongsTo(Stall, { foreignKey: 'stallId' });

Stall.hasMany(Image, { foreignKey: 'stallId' });

Stall.belongsToMany(Category, { through: 'CategoryStalls', foreignKey: 'stallId' });
Category.belongsToMany(Stall, { through: 'CategoryStalls', foreignKey: 'categoryId' });

Stall.hasMany(Review, { foreignKey: 'stallId' });
Review.belongsTo(Stall, { foreignKey: 'stallId' });

// Stall.addScope('asdf', { include: [{ association: Stall.associations.Categories }] });

export default Stall;
