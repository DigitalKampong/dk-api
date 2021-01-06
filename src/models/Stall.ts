import {
  Model,
  DataTypes,
  Optional,
  Association,
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
import CategoryStall from './CategoryStall';
import Review from './Review';

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
  public createImages!: HasManyCreateAssociationMixin<Image>;
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
  public createReviews!: HasManyCreateAssociationMixin<Review>;
  public getReviews!: HasManyGetAssociationsMixin<Review>;
  public hasReview!: HasManyHasAssociationMixin<Review, number>;
  public hasReviews!: HasManyHasAssociationsMixin<Review, number>;
  public removeReview!: HasManyRemoveAssociationMixin<Review, number>;
  public removeReviews!: HasManyRemoveAssociationsMixin<Review, number>;
  public setReviews!: HasManySetAssociationsMixin<Review, number>;

  public readonly HawkerCentre?: HawkerCentre;
  public readonly Products?: Product[];
  public readonly Images?: Image[];
  public readonly Reviews?: Review[];

  public static associations: {
    HawkerCentre: Association<Stall, HawkerCentre>;
    Products: Association<Stall, Product>;
    Images: Association<Stall, Image>;
    Reviews: Association<Stall, Review>;
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
  },
  { sequelize }
);

Stall.hasMany(Product, { foreignKey: 'stallId', onDelete: 'cascade', hooks: true });
Product.belongsTo(Stall, { foreignKey: 'stallId' });

Stall.hasMany(Image, { foreignKey: 'stallId' });
CategoryStall.belongsTo(Stall, { foreignKey: 'stallId' });

Stall.hasMany(Review, { foreignKey: 'stallId' });
Review.belongsTo(Stall, { foreignKey: 'stallId' });

export default Stall;
