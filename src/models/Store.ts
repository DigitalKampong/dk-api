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
    contactNo: {
      type: DataTypes.STRING,
    },
  },
  {sequelize}
);

export default Store;
