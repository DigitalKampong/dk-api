import { SecurityQuestion } from '../models/';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/httpErrors';

async function retrieveSecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const securityQuestion = await SecurityQuestion.findByPk(req.params.id);
    if (securityQuestion === null) {
      throw new NotFoundError('Security Question cannot be found');
    }
    req.securityQuestion = securityQuestion;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexSecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const securityQuestions = await SecurityQuestion.findAll();
    res.status(200).json(securityQuestions);
  } catch (err) {
    next(err);
  }
}

async function showSecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.securityQuestion);
  } catch (err) {
    next(err);
  }
}

async function indexActiveSecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const securityQuestions = await SecurityQuestion.findAll({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(securityQuestions);
  } catch (err) {
    next(err);
  }
}

async function createSecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const securityQuestion = await SecurityQuestion.create(req.body);
    res.status(201).json(securityQuestion);
  } catch (err) {
    next(err);
  }
}

async function updateSecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const securityQuestion = await req.securityQuestion!.update(req.body);
    res.status(200).json(securityQuestion);
  } catch (err) {
    next(err);
  }
}

async function destroySecurityQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    await req.securityQuestion!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexSecurityQuestionFuncs = [indexSecurityQuestion];
export const showSecurityQuestionFuncs = [retrieveSecurityQuestion, showSecurityQuestion];
export const createSecurityQuestionFuncs = [createSecurityQuestion];
export const updateSecurityQuestionFuncs = [retrieveSecurityQuestion, updateSecurityQuestion];
export const destroySecurityQuestionFuncs = [retrieveSecurityQuestion, destroySecurityQuestion];

// Get all isActive Security Questions
export const indexActiveSecurityQuestionFuncs = [indexActiveSecurityQuestion];
