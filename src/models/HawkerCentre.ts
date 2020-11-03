import {Model, DataTypes, BelongsTo, HasMany} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';
import Region from './Region';

class HawkerCentre extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public regionId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static Region: BelongsTo<HawkerCentre, Region>;
  public static Stall: HasMany<HawkerCentre, Stall>;
}

HawkerCentre.init(
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
    address: {
      type: DataTypes.STRING,
    },
    regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Regions',
        key: 'id',
      },
    },
  },
  {sequelize}
);

HawkerCentre.Stall = HawkerCentre.hasMany(Stall, {foreignKey: 'hawkerCentreId'});
Stall.HawkerCentre = Stall.belongsTo(HawkerCentre, {foreignKey: 'hawkerCentreId'});

export default HawkerCentre;
