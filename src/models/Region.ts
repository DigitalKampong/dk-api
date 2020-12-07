import {
  Model,
  DataTypes,
  HasMany,
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

  public readonly hawkerCentres?: HawkerCentre[];

  public static associations: {
    hawkerCentres: Association<Region, HawkerCentre>;
  };

  // TODO: Delete once verified everything is working
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
