import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';

import sequelize from '../db';
import Stall from './Stall';
import User from './User';

export interface ReviewAttributes {
  id: number;
  description: string;
  rating: number;
  stallId: number;
  userId: number;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public description!: string;
  public rating!: number;
  public stallId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Review.belongsTo(Stall)
  public createStall!: BelongsToCreateAssociationMixin<Stall>;
  public getStall!: BelongsToGetAssociationMixin<Stall>;
  public setStall!: BelongsToSetAssociationMixin<Stall, number>;

  // Review.belongsTo(Stall)
  public createUser!: BelongsToCreateAssociationMixin<User>;
  public getUser!: BelongsToGetAssociationMixin<User>;
  public setUser!: BelongsToSetAssociationMixin<User, number>;

  public readonly User?: User;
  public readonly Stall?: Stall;

  public static associations: {
    Stall: Association<Review, Stall>;
    User: Association<Review, User>;
  };
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DOUBLE,
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

export default Review;
