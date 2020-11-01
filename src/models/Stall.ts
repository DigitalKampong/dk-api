import {Model, DataTypes, HasMany, BelongsTo, BelongsToGetAssociationMixin} from 'sequelize';

import sequelize from '../db';
import Product from './Product';
import HawkerCentre from './HawkerCentre';

class Stall extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public contactNo!: string | null;
  public hawkerCentreId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static HawkerCentre: BelongsTo<Stall, HawkerCentre>;
  public getHawkerCentre!: BelongsToGetAssociationMixin<HawkerCentre>;

  public static Product: HasMany<Stall, Product>;

  public readonly HawkerCentre?: HawkerCentre;
}

Stall.init(
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
    description: {
      type: DataTypes.STRING,
    },
    contactNo: {
      type: DataTypes.STRING,
    },
    unitNo: {
      type: DataTypes.INTEGER,
    },
    hawkerCentreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HawkerCentres',
        key: 'id',
      },
    },
  },
  {sequelize}
);

Stall.hasMany(Product, {foreignKey: 'stallId'});
Product.belongsTo(Stall, {foreignKey: 'stallId'});

export default Stall;
