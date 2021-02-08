import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/httpErrors';
import { ON_AUTH, ACCESS_TOKEN_SECRET } from '../consts';
import User from '../models/User';
import { ROLES } from '../models/User';

interface UserDecoded {
  id: number;
  iat: number; // issued at in epoch time
  exp: number; // expiry in epoch time
}

async function authImpl(req: Request, res: Response, next: NextFunction) {
  if (!ON_AUTH) {
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
    const decoded: UserDecoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      next(new UnauthorizedError('JWT expired. Please refresh token'));
      return;
    }

    next(err);
  }
}

async function adminAuthImpl(req: Request, res: Response, next: NextFunction) {
  if (!ON_AUTH) {
    next();
    return;
  }

  try {
    const role = (await User.findByPk(req.userId)).role;
    if (role !== ROLES.ADMIN) {
      throw new UnauthorizedError('Only admins can use this api route.');
    }
    next();
  } catch (err) {
    next(err);
  }
}

export const auth = authImpl;
export const adminAuth = [authImpl, adminAuthImpl];
