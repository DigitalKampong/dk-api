import {
  Model,
  DataTypes,
  Optional,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
import sequelize from '../db';
import bcrypt from 'bcryptjs';

import SecurityQuestion from './SecurityQuestion';
import User from './User';

export interface UserAnswerAttributes {
  id: number;
  content: string;
  userId: number;
  securityQuestionId: number;
}

export interface UserAnswerCreationAttributes extends Optional<UserAnswerAttributes, 'id'> {}

class UserAnswer
  extends Model<UserAnswerAttributes, UserAnswerCreationAttributes>
  implements UserAnswerAttributes {
  public id!: number;
  public content!: string;
  public userId!: number;
  public securityQuestionId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // UserAnswer.belongsTo(User)
  public createUser!: BelongsToCreateAssociationMixin<User>;
  public getUser!: BelongsToGetAssociationMixin<User>;
  public setUser!: BelongsToSetAssociationMixin<User, number>;

  // UserAnswer.belongsTo(SecurityQuestion)
  public createSecurityQuestion!: BelongsToCreateAssociationMixin<SecurityQuestion>;
  public getSecurityQuestion!: BelongsToGetAssociationMixin<SecurityQuestion>;
  public setSecurityQuestion!: BelongsToSetAssociationMixin<SecurityQuestion, number>;
}

UserAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    securityQuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SecurityQuestions',
        key: 'id',
      },
    },
  },
  { sequelize }
);

async function hashAnswer(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

UserAnswer.addHook('beforeCreate', async (userAnswer: UserAnswer, _options) => {
  userAnswer.content = await hashAnswer(userAnswer.content);
});

UserAnswer.addHook('beforeUpdate', async (userAnswer: UserAnswer, _options) => {
  if (userAnswer.changed('content')) {
    userAnswer.content = await hashAnswer(userAnswer.content);
  }
});

export default UserAnswer;
