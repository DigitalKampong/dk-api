import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sequelize from '../db';

import { questionAnswerSet } from './userAnswerController';
import { User, UserAnswer, SecurityQuestion } from '../models';
import { UserCreationAttributes } from '../models/User';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/httpErrors';
import { ACCESS_TOKEN_SECRET } from '../consts';
import { UserDecoded } from '../middleware/auth';

async function createUser(attributes: UserCreationAttributes) {
  try {
    const user = await User.create(attributes);
    return user;
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      throw new BadRequestError('User already exists');
    }

    throw err;
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  // Start atomic transaction
  const t = await sequelize.transaction();

  try {
    if (req.body['role'] === 'admin') {
      throw new UnauthorizedError('You are not authorized to create a admin.');
    }

    const { email, username, password, questionAnswerSet } = req.body;

    const user = await User.create({ email, username, password, role: 'user' }, { transaction: t });
    const userId = user.id;

    if (!questionAnswerSet) throw new BadRequestError('No questions and answers found!');

    await Promise.all(
      questionAnswerSet.map(async (questionAnswer: questionAnswerSet) => {
        const question = await SecurityQuestion.findByPk(questionAnswer.questionId);

        if (!question || !question.isActive)
          throw new BadRequestError('Question does not exist or is not active!');

        const securityQuestionId = question!.id;
        const content = questionAnswer.answer.trim().toLowerCase();

        if (!content) throw new BadRequestError('Answer cannot be blank!');

        await UserAnswer.create({ content, userId, securityQuestionId }, { transaction: t });
      })
    );

    const payload = {
      id: userId,
    };

    jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: '7 days' },
      async (err: Error | null, token: string | undefined) => {
        if (err) throw err;
        await t.commit();
        res.status(201).json({ token: token!, role: user.role });
      }
    );
  } catch (err) {
    await t.rollback();
    next(err);
  }
}

async function registerAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    let user = await createUser({ ...req.body, role: 'admin' });
    user = (await User.findByPk(user.id, { attributes: { exclude: ['password'] } })) as User;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestError('User does not exist');
    }

    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid Credentials');
    }

    const payload = {
      id: user!.id,
    };

    jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: '7 days' },
      (err: Error | null, token: string | undefined) => {
        if (err) throw err;
        res.status(201).json({ token: token!, role: user.role });
      }
    );
  } catch (err) {
    next(err);
  }
}

async function indexUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function retrieveUserByEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findOne({
      where: {
        email: req.query.email,
      },

      //Exclude these attribtues for security reasons, only return usedId, email and username which is sufficient
      //Also for FE to get the userId to send a POST request during validation
      attributes: {
        exclude: ['password', 'role'],
      },
      include: {
        association: User.associations.UserAnswers,
        attributes: ['id'],
        include: [
          {
            association: UserAnswer.associations.SecurityQuestion,
            attributes: ['id', 'content'],
          },
        ],
      },
    });

    if (!user) throw new NotFoundError('User with email does not exist!');

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function updateOtherUser(req: Request, res: Response, next: NextFunction) {
  try {
    const idToEdit = req.params.id;
    let user = await User.findByPk(idToEdit);

    if (!user) {
      throw new NotFoundError('User to edit cannot be found');
    }

    await user.update({ ...req.body });
    user = await User.findByPk(user.id, { attributes: { exclude: ['password'] } });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user!;
    await user.update({ ...req.body, role: user.role });
    await user.reload();

    // Scrub password from user before returning
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userObj: any = user!.get({ plain: true });
    delete userObj['password'];

    res.status(200).json(userObj);
  } catch (err) {
    next(err);
  }
}

async function passwordResetAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.query.resetToken as string;

    if (!token) throw new UnauthorizedError('No password reset token found!');

    const decoded = jwt.decode(token) as UserDecoded;

    const id = decoded.id;
    const user = await User.findByPk(id);

    if (!user) throw new NotFoundError('User Not Found!');

    const password = user.password;

    jwt.verify(token, password);

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
}

async function updateUserPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const newPassword = req.body.newPassword;

    const updatedUser = await req.user!.update({
      password: newPassword,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function retrieveUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new NotFoundError('User cannot be found');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

async function destroyUser(req: Request, res: Response, next: NextFunction) {
  try {
    await req.user!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const registerFuncs = [register];
export const registerAdminFuncs = [registerAdmin];
export const loginFuncs = [login];
export const indexUserFuncs = [indexUser];
export const retrieveUserFuncs = [retrieveUser];
export const retrieveUserByEmailFuncs = [retrieveUserByEmail];
export const updateUserFuncs = [updateUser];
export const deleteUserFuncs = [retrieveUser, destroyUser];
export const updateOtherUserFuncs = [updateOtherUser];
export const updateUserPasswordFuncs = [passwordResetAuth, updateUserPassword];
