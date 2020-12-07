import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsTo,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';

interface ProductAttributes {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  price: number | null;
  image: string | null;
  stallId: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes {
  public id!: number;
  public name!: string;
  public category!: string | null;
  public description!: string | null;
  public price!: number | null;
  public image!: string | null;
  public stallId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Product.belongsTo(Stall)
  public createStall!: BelongsToCreateAssociationMixin<Stall>;
  public getStall!: BelongsToGetAssociationMixin<Stall>;
  public setStall!: BelongsToSetAssociationMixin<Stall, number>;

  public readonly stall?: Stall;

  public static associations: {
    Stall: Association<Product, Stall>;
  };
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
