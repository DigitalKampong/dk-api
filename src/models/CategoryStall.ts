import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

import sequelize from '../db';
import Category from './Category';
import Stall from './Stall';

interface CategoryStallAttributes {
  id: number;
  stallId: number;
  categoryId: number;
}

interface CategoryStallCreationAttributes extends Optional<CategoryStallAttributes, 'id'> {}

class CategoryStall
  extends Model<CategoryStallAttributes, CategoryStallCreationAttributes>
  implements CategoryStallAttributes {
  public id!: number;
  public stallId!: number;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // CategoryStall.belongsTo(Stall)
  public createCategory!: BelongsToCreateAssociationMixin<Category>;
  public getCategory!: BelongsToGetAssociationMixin<Category>;
  public setCategory!: BelongsToSetAssociationMixin<Category, number>;

  // Category.belongsTo(Category)
  public createStall!: BelongsToCreateAssociationMixin<Stall>;
  public getStall!: BelongsToGetAssociationMixin<Stall>;
  public setStall!: BelongsToSetAssociationMixin<Stall, number>;

  public readonly category?: Category;
  public readonly stall?: Stall;

  public static associations: {
    Category: Association<CategoryStall, Category>;
    Stall: Association<CategoryStall, Stall>;
  };
}

CategoryStall.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    stallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stalls',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  },
  {sequelize}
);

CategoryStall.belongsTo(Stall, {foreignKey: 'stallId'});
CategoryStall.belongsTo(Category, {foreignKey: 'categoryId'});

export default CategoryStall;
