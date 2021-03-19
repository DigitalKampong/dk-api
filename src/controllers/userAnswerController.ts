import { UserAnswer, User } from '../models/';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../errors/httpErrors';
import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcryptjs';

async function retrieveUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const userAnswer = await UserAnswer.findByPk(req.params.id);
    if (userAnswer === null) {
      throw new NotFoundError('Security Question cannot be found');
    }
    req.userAnswer = userAnswer;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const userAnswers = await UserAnswer.findAll();
    res.status(200).json(userAnswers);
  } catch (err) {
    next(err);
  }
}

async function showUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.userAnswer);
  } catch (err) {
    next(err);
  }
}

async function createUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.body.cotent) req.body.content = req.body.content.trim(); // Remove whitespace before hashing

    const userAnswer = await UserAnswer.create(req.body);
    res.status(201).json(userAnswer);
  } catch (err) {
    if (err instanceof UniqueConstraintError)
      next(new BadRequestError('The User already has already used this question!'));
    next(err);
  }
}

async function updateUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const userAnswer = await req.userAnswer!.update(req.body);
    res.status(200).json(userAnswer);
  } catch (err) {
    next(err);
  }
}

async function destroyUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    await req.userAnswer!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

async function validateSecurityQuestionAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId, questionId, answer } = req.body;
    const userAnswer = await UserAnswer.findOne({
      where: {
        userId,
        securityQuestionId: questionId,
      },
    });

    if (!userAnswer) {
      throw new BadRequestError('Answer cannot be found!');
    }

    const isMatch = await bcrypt.compare(answer.trim(), userAnswer!.content);
    if (!isMatch) {
      throw new UnauthorizedError('Wrong answer!');
    }

    res.status(200).json('Answered Question Successfully!');
  } catch (err) {
    next(err);
  }
}

export const indexUserAnswerFuncs = [indexUserAnswer];
export const showUserAnswerFuncs = [retrieveUserAnswer, showUserAnswer];
export const createUserAnswerFuncs = [createUserAnswer];
export const updateUserAnswerFuncs = [retrieveUserAnswer, updateUserAnswer];
export const destroyUserAnswerFuncs = [retrieveUserAnswer, destroyUserAnswer];
export const validateUserAnswerFuncs = [validateSecurityQuestionAnswer];
