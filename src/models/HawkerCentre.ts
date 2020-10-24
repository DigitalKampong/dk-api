import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';

class HawkerCentre extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public regionId!: number;
}

HawkerCentre.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    regionId: {
      type: DataTypes.INTEGER,
    },
  },
  {sequelize}
);

HawkerCentre.hasMany(Stall, {foreignKey: 'hawkerCentreId'});
Stall.belongsTo(HawkerCentre, {foreignKey: 'hawkerCentreId'});

export default HawkerCentre;
