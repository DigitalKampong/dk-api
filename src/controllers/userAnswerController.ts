import { UserAnswer, SecurityQuestion } from '../models/';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../errors/httpErrors';
import { UniqueConstraintError } from 'sequelize';
import bcrypt from 'bcryptjs';

interface questionAnswerSet {
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

async function createUserAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.body.content)
      throw new BadRequestError('Answer for security question must not be empty!');

    req.body.content = req.body.content.trim();

    const question = await SecurityQuestion.findByPk(req.body.securityQuestionId);

    if (!question || !question.isActive)
      throw new BadRequestError('Question does not exist or is not active!');

    const userAnswer = await UserAnswer.create(req.body);
    res.status(201).json(userAnswer);
  } catch (err) {
    if (err instanceof UniqueConstraintError)
      next(new BadRequestError('The User already has already used this question!'));
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
        const answer = questionAnswer.answer;

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

    res.status(200).json('Answered Question Successfully!');
  } catch (err) {
    next(err);
  }
}

export const createUserAnswerFuncs = [createUserAnswer];
export const destroyUserAnswerFuncs = [retrieveUserAnswer, destroyUserAnswer];
export const validateUserAnswerFuncs = [validateSecurityQuestionAnswer];
