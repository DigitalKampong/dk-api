import { UserAnswer, User } from '../models/';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../errors/httpErrors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface questionAnswerSet {
  questionId: number;
  answer: string;
}

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
    const { userId, questionAnswerSet } = req.body;

    await Promise.all(
      questionAnswerSet.map(async (questionAnswer: questionAnswerSet) => {
        const questionId = questionAnswer.questionId;
        const answer = questionAnswer.answer.toLowerCase();

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
      })
    );

    const user = await User.findByPk(userId);

    if (!user) throw new NotFoundError('No user with this id found!');

    const password = user.password;

    const payload = {
      id: user.id,
    };

    jwt.sign(
      payload,
      password,
      { expiresIn: 600 }, //600s -> 10 mins
      (err: Error | null, token: string | undefined) => {
        if (err) throw err;
        res.status(201).json({ resetToken: token! });
      }
    );
  } catch (err) {
    next(err);
  }
}

export const destroyUserAnswerFuncs = [retrieveUserAnswer, destroyUserAnswer];
export const validateUserAnswerFuncs = [validateSecurityQuestionAnswer];
