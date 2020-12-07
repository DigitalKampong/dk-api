import {
  Model,
  DataTypes,
  BelongsTo,
  HasMany,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
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
import Stall from './Stall';
import Region from './Region';

interface HawkerCentreAttributes {
  id: number;
  name: string;
  address: string | null;
  regionId: number;
}

interface HawkerCentreCreationAttributes extends Optional<HawkerCentreAttributes, 'id'> {}

class HawkerCentre extends Model<HawkerCentreAttributes, HawkerCentreCreationAttributes> {
  public id!: number;
  public name!: string;
  public address!: string | null;
  public regionId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // HawkerCentre.belongsTo(Region)
  public createRegion!: BelongsToCreateAssociationMixin<Region>;
  public getRegion!: BelongsToGetAssociationMixin<Region>;
  public setRegion!: BelongsToSetAssociationMixin<Region, number>;

  // HawkerCentre.hasMany(Stall)
  public addStall!: HasManyAddAssociationMixin<Stall, number>;
  public addStalls!: HasManyAddAssociationsMixin<Stall, number>;
  public countStalls!: HasManyCountAssociationsMixin;
  public createStalls!: HasManyCreateAssociationMixin<Stall>;
  public getStalls!: HasManyGetAssociationsMixin<Stall>;
  public hasStall!: HasManyHasAssociationMixin<Stall, number>;
  public hasStalls!: HasManyHasAssociationsMixin<Stall, number>;
  public removeStall!: HasManyRemoveAssociationMixin<Stall, number>;
  public removeStalls!: HasManyRemoveAssociationsMixin<Stall, number>;
  public setStalls!: HasManySetAssociationsMixin<Stall, number>;

  public readonly region?: Region;
  public readonly stalls?: Stall[];

  public static associations: {
    region: Association<HawkerCentre, Region>;
    stalls: Association<HawkerCentre, Stall>;
  };

  // TODO: Delete once everything is working
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
