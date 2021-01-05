import Review from '../models/Review';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError, BadRequestError } from '../errors/httpErrors';
import jwt_decode from 'jwt-decode';
import { UniqueConstraintError } from 'sequelize';
import { JWTPayload } from '../middleware/class/class';

async function retrieveReview(req: Request, res: Response, next: NextFunction) {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        { association: Review.associations.Stall },
        { association: Review.associations.User },
      ],
    });
    if (review === null) {
      throw new NotFoundError('Review cannot be found');
    }

    req.review = review;
    next();
  } catch (err) {
    next(err);
  }
}

async function indexReview(req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await Review.findAll({
      where: {
        stallId: req.params.id,
      },
      include: [
        { association: Review.associations.Stall },
        { association: Review.associations.User },
      ],
    });
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
}

async function showReview(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(req.review);
  } catch (err) {
    next(err);
  }
}

async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('x-auth-token');
    const payload: JWTPayload = jwt_decode(token!);
    const userId = payload['id'];
    const stallId = req.params.id;
    req.body = { ...req.body, stallId, userId };
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    if (err instanceof UniqueConstraintError)
      next(new BadRequestError('A review for this stall already exists!'));

    next(err);
  }
}

async function updateReview(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('x-auth-token');
    const payload: JWTPayload = jwt_decode(token!);
    const userId = payload['id'];
    req.body = { ...req.body, userId };
    const review = await req.review!.update(req.body);
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
}

async function destroyReview(req: Request, res: Response, next: NextFunction) {
  try {
    await req.review!.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
}

export const indexReviewFuncs = [indexReview];
export const showReviewFuncs = [retrieveReview, showReview];
export const createReviewFuncs = [createReview];
export const updateReviewFuncs = [retrieveReview, updateReview];
export const destroyReviewFuncs = [retrieveReview, destroyReview];
