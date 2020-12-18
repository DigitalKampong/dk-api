import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

function auth(req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    next('No token, authorization denied');
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: Error, decoded: User) => {
      if (err) {
        next(err);
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    next(err);
  }
}

export default auth;
