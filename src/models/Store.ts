import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';

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
  },
  {sequelize}
);

export default Store;
