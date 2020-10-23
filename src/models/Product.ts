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
    category: {
      type: DataTypes.STRING,
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: false,
    },      
    price: {
      type: DataTypes.NUMBER,
    },
    pic: {
      type: DataTypes.STRING,
    },
    
  },
  {sequelize}
);


export default Product;
