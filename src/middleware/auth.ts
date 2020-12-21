import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/httpErrors';
import { AUTH_ON, ACCESS_TOKEN_SECRET } from '../consts';

interface UserDecoded {
  id: number;
  iat: number; // issued at in epoch time
  exp: number; // expiry in epoch time
}

function auth(req: Request, res: Response, next: NextFunction) {
  if (!AUTH_ON) {
    next();
    return;
  }

  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    next(new UnauthorizedError('No token, authorization denied'));
    return;
  }

  try {
    jwt.verify(
      token,
      ACCESS_TOKEN_SECRET,
      async (err: Error | null, decoded: object | undefined) => {
        if (err) {
          if (err instanceof TokenExpiredError) {
            next(new UnauthorizedError('JWT expired. Please refresh token'));
          } else {
            next(err);
          }
        } else {
          req.userId = (decoded as UserDecoded).id;
          next();
        }
      }
    );
  } catch (err) {
    next(err);
  }
}

export default auth;
