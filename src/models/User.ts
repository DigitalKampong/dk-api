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
import bcrypt from 'bcryptjs';

import sequelize from '../db';

import Review from './Review';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export enum ROLES {
  USER = 'user',
  ADMIN = 'admin',
}
const ALLOWED_ROLES = [ROLES.USER, ROLES.ADMIN];

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // User.hasMany(Review)
  public addReview!: HasManyAddAssociationMixin<Review, number>;
  public addReviews!: HasManyAddAssociationsMixin<Review, number>;
  public countReviews!: HasManyCountAssociationsMixin;
  public createReviews!: HasManyCreateAssociationMixin<Review>;
  public getReviews!: HasManyGetAssociationsMixin<Review>;
  public hasReview!: HasManyHasAssociationMixin<Review, number>;
  public hasReviews!: HasManyHasAssociationsMixin<Review, number>;
  public removeReview!: HasManyRemoveAssociationMixin<Review, number>;
  public removeReviews!: HasManyRemoveAssociationsMixin<Review, number>;
  public setReviews!: HasManySetAssociationsMixin<Review, number>;

  public readonly Reviews?: Review[];

  public static associations: {
    Reviews: Association<User, Review>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      },
    },
    role: {
      type: DataTypes.ENUM(...ALLOWED_ROLES),
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [ALLOWED_ROLES],
      },
    },
  },
  { sequelize }
);

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Typescript registers user as Model<UserAttributes, UserCreationAttributes> but reports that password property is missing.
// Can relook this later when we have the time.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
User.addHook('beforeCreate', async (user: any, _options) => {
  user.password = await hashPassword(user.password);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
User.addHook('beforeUpdate', async (user: any, _options) => {
  if (user.changed('password')) {
    user.password = await hashPassword(user.password);
  }
});

export default User;
