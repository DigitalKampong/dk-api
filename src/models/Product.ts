import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';

class Product extends Model {
  public id!: number;
  public category!: string;
  public productname!: string;
  public price!: string;
  public pic!: string;
  public store_id!: number;
}

Product.init(
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
  },
  {sequelize}
);

export default Product;
