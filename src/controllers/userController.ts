import { Request, Response, NextFunction } from 'express';
import { UniqueConstraintError } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { User } from '../models';
import { BadRequestError, UnauthorizedError } from '../errors/httpErrors';
import { ACCESS_TOKEN_SECRET } from '../consts';

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.create({ ...req.body });

    const payload = {
      id: user.id,
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
    if (err instanceof UniqueConstraintError) {
      next(new BadRequestError('User already exists'));
    } else {
      next(err);
    }
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

async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user!;
    await user.update({ ...req.body });
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

export const registerFuncs = [register];
export const loginFuncs = [login];
export const updateUserFuncs = [updateUser];
