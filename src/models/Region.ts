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
import HawkerCentre from './HawkerCentre';

interface RegionAttributes {
  id: number;
  name: string;
}

interface RegionCreationAttributes extends Optional<RegionAttributes, 'id'> {}

class Region extends Model<RegionAttributes, RegionCreationAttributes> implements RegionAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Region.hasMany(HawkerCentre)
  public addHawkerCentre!: HasManyAddAssociationMixin<HawkerCentre, number>;
  public addHawkerCentres!: HasManyAddAssociationsMixin<HawkerCentre, number>;
  public countHawkerCentres!: HasManyCountAssociationsMixin;
  public createHawkerCentres!: HasManyCreateAssociationMixin<HawkerCentre>;
  public getHawkerCentres!: HasManyGetAssociationsMixin<HawkerCentre>;
  public hasHawkerCentre!: HasManyHasAssociationMixin<HawkerCentre, number>;
  public hasHawkerCentres!: HasManyHasAssociationsMixin<HawkerCentre, number>;
  public removeHawkerCentre!: HasManyRemoveAssociationMixin<HawkerCentre, number>;
  public removeHawkerCentres!: HasManyRemoveAssociationsMixin<HawkerCentre, number>;
  public setHawkerCentres!: HasManySetAssociationsMixin<HawkerCentre, number>;

  public readonly HawkerCentres?: HawkerCentre[];

  public static associations: {
    HawkerCentres: Association<Region, HawkerCentre>;
  };
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

Region.hasMany(HawkerCentre, {foreignKey: 'regionId'});
HawkerCentre.belongsTo(Region, {foreignKey: 'regionId'});

export default Region;
