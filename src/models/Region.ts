import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import HawkerCentre from './HawkerCentre';

class Region extends Model {
  public id!: number;
  public name!: string;
}

Region.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {sequelize}
);

Region.hasMany(HawkerCentre, {foreignKey: 'regionId'});

export default Region;
