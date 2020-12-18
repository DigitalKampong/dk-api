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

interface StallAttributes {
  id: number;
  name: string;
  description: string | null;
  rating: number | null;
  contactNo: string | null;
  unitNo: string | null;
  hawkerCentreId: number;
}

interface StallCreationAttributes extends Optional<StallAttributes, 'id'> {}

class Stall extends Model<StallAttributes, StallCreationAttributes> implements StallAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public rating!: number | null;
  public contactNo!: string | null;
  public unitNo!: string | null;
  public hawkerCentreId!: number;

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

  public readonly HawkerCentre?: HawkerCentre;
  public readonly Products?: Product[];
  public readonly Images?: Image[];

  public static associations: {
    HawkerCentre: Association<Stall, HawkerCentre>;
    Products: Association<Stall, Product>;
    Images: Association<Stall, Image>;
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
    rating: {
      type: DataTypes.DOUBLE,
    },
    contactNo: {
      type: DataTypes.STRING,
    },
    unitNo: {
      type: DataTypes.INTEGER,
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

Stall.hasMany(Product, { foreignKey: 'stallId' });
Product.belongsTo(Stall, { foreignKey: 'stallId' });
Stall.hasMany(Image, { foreignKey: 'stallId' });
CategoryStall.belongsTo(Stall, { foreignKey: 'stallId' });

export default Stall;
