import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';
import Image from './Image';

interface ProductAttributes {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  price: number | null;
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
  public stallId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Product.belongsTo(Stall)
  public createStall!: BelongsToCreateAssociationMixin<Stall>;
  public getStall!: BelongsToGetAssociationMixin<Stall>;
  public setStall!: BelongsToSetAssociationMixin<Stall, number>;

  // Product.hasMany(Image)
  public addImage!: HasManyAddAssociationMixin<Image, number>;
  public addImages!: HasManyAddAssociationsMixin<Image, number>;
  public countImages!: HasManyCountAssociationsMixin;
  public createImages!: HasManyCreateAssociationMixin<Image>;
  public getImages!: HasManyGetAssociationsMixin<Image>;
  public hasImage!: HasManyHasAssociationMixin<Image, number>;
  public hasImages!: HasManyHasAssociationsMixin<Image, number>;
  public removeImage!: HasManyRemoveAssociationMixin<Image, number>;
  public removeImages!: HasManyRemoveAssociationsMixin<Image, number>;
  public setImages!: HasManySetAssociationsMixin<Image, number>;

  public readonly Stall?: Stall;
  public readonly Images?: Image[];

  public static associations: {
    Stall: Association<Product, Stall>;
    Images: Association<Product, Image>;
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
    stallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stalls',
        key: 'id',
      },
    },
  },
  { sequelize }
);

Product.hasMany(Image, { foreignKey: 'productId' });

export default Product;
