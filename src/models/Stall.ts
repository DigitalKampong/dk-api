import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsTo,
  HasMany,
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

interface StallAttributes {
  id: number;
  name: string;
  description: string | null;
  contactNo: string | null;
  unitNo: string | null;
  hawkerCentreId: number;
}

interface StallCreationAttributes extends Optional<StallAttributes, 'id'> {}

class Stall extends Model<StallAttributes, StallCreationAttributes> implements StallAttributes {
  public id!: number;
  public name!: string;
  public description!: string | null;
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

  public readonly HawkerCentre?: HawkerCentre;
  public readonly Products?: Product[];

  public static associations: {
    hawkerCentres: Association<Stall, HawkerCentre>;
    products: Association<Stall, Product>;
  };

  // TODO: Delete once everything is working
  public static HawkerCentre: BelongsTo<Stall, HawkerCentre>;
  public static Product: HasMany<Stall, Product>;
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
    hawkerCentreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HawkerCentres',
        key: 'id',
      },
    },
  },
  {sequelize}
);

Stall.Product = Stall.hasMany(Product, {foreignKey: 'stallId'});
Product.Stall = Product.belongsTo(Stall, {foreignKey: 'stallId'});

export default Stall;
