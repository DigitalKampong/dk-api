import {
  Model,
  DataTypes,
  Optional,
  Association,
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
import Image from './Image';

export interface HawkerCentreAttributes {
  id: number;
  name: string;
  address: string | null;
  regionId: number;
  lat: number | null;
  lng: number | null;
  bus: string | null;
  mrt: string | null;
}

export interface HawkerCentreCreationAttributes extends Optional<HawkerCentreAttributes, 'id'> {}

class HawkerCentre
  extends Model<HawkerCentreAttributes, HawkerCentreCreationAttributes>
  implements HawkerCentreAttributes {
  public id!: number;
  public name!: string;
  public address!: string | null;
  public regionId!: number;
  public lat!: number | null;
  public lng!: number | null;
  public bus!: string | null;
  public mrt!: string | null;

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

  // HawkerCentre.hasMany(Image)
  public addImage!: HasManyAddAssociationMixin<Image, number>;
  public addImages!: HasManyAddAssociationsMixin<Image, number>;
  public countImages!: HasManyCountAssociationsMixin;
  public createImage!: HasManyCreateAssociationMixin<Image>;
  public getImages!: HasManyGetAssociationsMixin<Image>;
  public hasImage!: HasManyHasAssociationMixin<Image, number>;
  public hasImages!: HasManyHasAssociationsMixin<Image, number>;
  public removeImage!: HasManyRemoveAssociationMixin<Image, number>;
  public removeImages!: HasManyRemoveAssociationsMixin<Image, number>;
  public setImages!: HasManySetAssociationsMixin<Image, number>;

  public readonly Region?: Region;
  public readonly Stalls?: Stall[];
  public readonly Images?: Image[];

  public static associations: {
    Region: Association<HawkerCentre, Region>;
    Stalls: Association<HawkerCentre, Stall>;
    Images: Association<Stall, Image>;
  };
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
    lat: {
      type: DataTypes.DOUBLE,
    },
    lng: {
      type: DataTypes.DOUBLE,
    },
    bus: {
      type: DataTypes.STRING,
    },
    mrt: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

export default HawkerCentre;
