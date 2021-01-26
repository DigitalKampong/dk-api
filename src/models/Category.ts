import { Model, DataTypes, Optional, Association } from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';

export interface CategoryAttributes {
  id: number;
  name: string;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly stalls?: Stall[];

  public static associations: {
    Stalls: Association<Category, Stall>;
  };
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default Category;
