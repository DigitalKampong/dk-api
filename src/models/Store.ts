import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import Product from './Product';

class Store extends Model {
  public id!: number;
  public name!: string;
  public contactNo!: string;
}

Store.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
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
  },
  {sequelize}
);

Store.hasMany(Product, {foreignKey: 'storeId'});

export default Store;
