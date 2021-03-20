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
import UserAnswer from './UserAnswer';

export interface SecurityQuestionAttributes {
  id: number;
  isActive: boolean;
  content: string;
}

export interface SecurityQuestionCreationAttributes
  extends Optional<SecurityQuestionAttributes, 'id'> {}

class SecurityQuestion
  extends Model<SecurityQuestionAttributes, SecurityQuestionCreationAttributes>
  implements SecurityQuestionAttributes {
  public id!: number;
  public isActive!: boolean;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // SecurityQuestion.hasMany(UserAnswer)
  public addUserAnswer!: HasManyAddAssociationMixin<UserAnswer, number>;
  public addUserAnswers!: HasManyAddAssociationsMixin<UserAnswer, number>;
  public countUserAnswers!: HasManyCountAssociationsMixin;
  public createUserAnswers!: HasManyCreateAssociationMixin<UserAnswer>;
  public getUserAnswers!: HasManyGetAssociationsMixin<UserAnswer>;
  public hasUserAnswer!: HasManyHasAssociationMixin<UserAnswer, number>;
  public hasUserAnswers!: HasManyHasAssociationsMixin<UserAnswer, number>;
  public removeUserAnswer!: HasManyRemoveAssociationMixin<UserAnswer, number>;
  public removeUserAnswers!: HasManyRemoveAssociationsMixin<UserAnswer, number>;
  public setUserAnswers!: HasManySetAssociationsMixin<UserAnswer, number>;

  public readonly UserAnswers?: UserAnswer[];

  public static associations: {
    UserAnswers: Association<SecurityQuestion, UserAnswer>;
  };
}

SecurityQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

export default SecurityQuestion;
