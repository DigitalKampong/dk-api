import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import HawkerCentre from './HawkerCentre';

class Region extends Model {
  public regionId!: number;
  public name!: string;
}

Region.init(
  {
    regionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {sequelize}
);

Region.hasMany(HawkerCentre, {foreignKey: 'regionId'});
HawkerCentre.belongsTo(Region, {foreignKey: 'regionId'});

export default Region;
