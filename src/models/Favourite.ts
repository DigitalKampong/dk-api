import { Model, Optional, Association, DataTypes } from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';
import User from './User';

export interface FavouriteAttributes {
  id: number;
  stallId: number;
  userId: number;
}

export interface FavouriteCreationAttributes extends Optional<FavouriteAttributes, 'id'> {}

class Favourite
  extends Model<FavouriteAttributes, FavouriteCreationAttributes>
  implements FavouriteAttributes {
  public id!: number;
  public stallId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly User?: User;
  public readonly Stall?: Stall;

  public static associations: {
    Stall: Association<Favourite, Stall>;
    User: Association<Favourite, User>;
  };
}

Favourite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    stallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Stalls',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  { sequelize }
);

export default Favourite;
