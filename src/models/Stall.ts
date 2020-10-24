import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import Product from './Product';

class Stall extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public contactNo!: string;
  public unitNo!: string;
  public address?: string;
  public hawkerCentreId!: number;
}

Stall.init(
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

Stall.hasMany(Product, {foreignKey: 'stallId'});
Product.belongsTo(Stall, {foreignKey: 'stallId'});

export default Stall;
