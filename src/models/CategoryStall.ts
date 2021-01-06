import { Model, DataTypes, Optional } from 'sequelize';

import sequelize from '../db';

export interface CategoryStallAttributes {
  id: number;
  stallId: number;
  categoryId: number;
}

export interface CategoryStallCreationAttributes extends Optional<CategoryStallAttributes, 'id'> {}

class CategoryStall
  extends Model<CategoryStallAttributes, CategoryStallCreationAttributes>
  implements CategoryStallAttributes {
  public id!: number;
  public stallId!: number;
  public categoryId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
        model: 'Categories',
        key: 'id',
      },
    },
  },
  { sequelize }
);

export default CategoryStall;
