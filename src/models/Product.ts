import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';

class Product extends Model {
  public productId!: number;
  public name!: string;
  public category!: string;
  public description!: string;
  public price!: number;
  public image!: string;
  public stall_id!: number;
}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.NUMBER,
    },
    image: {
      type: DataTypes.STRING,
    },
    stallId: {
      type: DataTypes.INTEGER,
    },
  },
  {sequelize}
);

export default Product;
