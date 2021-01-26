import { Model, DataTypes } from 'sequelize';

import sequelize from '../db';
import { GCS_BASE_URL, GCS_BUCKET } from '../consts';

export interface ImageAttributes {
  id: number;
  fileName: string;
  downloadUrl: string;
  productId: number | null;
  stallId: number | null;
}

export interface ImageCreationAttributes {
  fileName: string;
}

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
  public id!: number;
  public fileName!: string;
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
    fileName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    downloadUrl: {
      // Having a dependency on fileName for downloadUrl virtual attribute will return fileName field in the response too
      // See https://github.com/sequelize/sequelize/issues/7237
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ['fileName']),
      get() {
        return `${GCS_BASE_URL}/${GCS_BUCKET}/${this.getDataValue('fileName')}`;
      },
      set(_val) {
        throw new Error('Do not try to set virtual attribute downloadUrl');
      },
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
