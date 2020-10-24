import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import Product from './Product';

class Store extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public contactNo!: string;
  public unitNo!: string;
  public address?: string;
  public hawkerCentreId!: number;
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
    },
  },
  {sequelize}
);

Store.hasMany(Product, {foreignKey: 'storeId'});
Product.belongsTo(Store);

export default Store;
