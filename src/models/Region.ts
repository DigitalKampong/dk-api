import {Model, DataTypes, HasMany} from 'sequelize';

import sequelize from '../db';
import HawkerCentre from './HawkerCentre';

class Region extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static HawkerCentre: HasMany<Region, HawkerCentre>;
}

Region.init(
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
  },
  {sequelize}
);

Region.HawkerCentre = Region.hasMany(HawkerCentre, {foreignKey: 'regionId'});
HawkerCentre.Region = HawkerCentre.belongsTo(Region, {foreignKey: 'regionId'});

export default Region;
