import {Model, DataTypes} from 'sequelize';

import sequelize from '../db';
import Store from './Store';

class HawkerCentre extends Model {
  public id!: number;
  public name!: string;
  public regionId!: number;
  public address!: string;
}

HawkerCentre.init(
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
    address: {
      type: DataTypes.STRING,
    },
  },
  {sequelize}
);

HawkerCentre.hasMany(Store, {foreignKey: 'hawkerCentreId'});

export default HawkerCentre;
