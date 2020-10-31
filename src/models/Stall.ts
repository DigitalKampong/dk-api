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

Stall.hasMany(Product, {foreignKey: 'stallId'});
Product.belongsTo(Stall, {foreignKey: 'stallId'});

export default Stall;
