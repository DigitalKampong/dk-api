import {Model, DataTypes, BelongsTo} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';

class Product extends Model {
  public id!: number;
  public name!: string;
  public category!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  public stallId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static Stall: BelongsTo<Product, Stall>;
}

Product.init(
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
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    image: {
      type: DataTypes.STRING,
    },
    stallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stalls',
        key: 'id',
      },
    },
  },
  {sequelize}
);

export default Product;
