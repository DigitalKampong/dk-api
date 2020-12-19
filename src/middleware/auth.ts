import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/httpErrors';
import User from '../models/User';
import { ACCESS_TOKEN_SECRET } from '../consts';

function auth(req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    next(new UnauthorizedError('No token, authorization denied'));
  }

  try {
    // High chance the decoded value is wrong. Payload only contains { id: user.id }, unlikely will take the form of User
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err: Error, decoded: User) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          next(new UnauthorizedError('jwt expired. Please refresh token'));
        } else {
          next(err);
        }
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
