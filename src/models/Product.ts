import {
  Model,
  DataTypes,
  BelongsTo,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';

interface ProductAttributes {
  public id: number;
  public name: string;
  public category: string | null;
  public description: string | null;
  public price: number | null;
  public image: string | null;
  public stall_id: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
  public id!: number;
  public name!: string;
  public category!: string | null;
  public description!: string | null;
  public price!: number | null;
  public image!: string | null;
  public stall_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Product.belongsTo(Stall)
  public createStall!: BelongsToCreateAssociationMixin<Stall>;
  public getStall!: BelongsToGetAssociationMixin<Stall>;
  public setStall!: BelongsToSetAssociationMixin<Stall, number>;

  public readonly stall?: Stall;

  public static associations: {
    stall: Association<Product, Stall>;
  };

  // TODO: Delete once everything is working
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
