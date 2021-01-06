import {
  Model,
  DataTypes,
  Optional,
  Association,
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
import CategoryStall from './CategoryStall';

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

  // category.hasMany(CategoryStall)
  public addCategoryStall!: HasManyAddAssociationMixin<CategoryStall, number>;
  public addCategoryStalls!: HasManyAddAssociationsMixin<CategoryStall, number>;
  public countCategoryStalls!: HasManyCountAssociationsMixin;
  public createCategoryStall!: HasManyCreateAssociationMixin<CategoryStall>;
  public getCategoryStalls!: HasManyGetAssociationsMixin<CategoryStall>;
  public hasCategoryStall!: HasManyHasAssociationMixin<CategoryStall, number>;
  public hasCategoryStalls!: HasManyHasAssociationsMixin<CategoryStall, number>;
  public removeCategoryStall!: HasManyRemoveAssociationMixin<CategoryStall, number>;
  public removeCategoryStalls!: HasManyRemoveAssociationsMixin<CategoryStall, number>;
  public setCategoryStalls!: HasManySetAssociationsMixin<CategoryStall, number>;

  public readonly categoryStalls?: CategoryStall[];

  public static associations: {
    CategoryStalls: Association<Category, CategoryStall>;
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
