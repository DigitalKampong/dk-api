import { Model, DataTypes } from 'sequelize';

import sequelize from '../db';

interface ImageAttributes {
  id: number;
  downloadUrl: string;
  productId: number | null;
  stallId: number | null;
}

interface ImageCreationAttributes {
  downloadUrl: string;
}

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public downloadUrl!: string;
  public productId!: number | null;
  public stallId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    downloadUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    stallId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Stalls',
        key: 'id',
      },
    },
  },
  { sequelize }
);

export default Image;
