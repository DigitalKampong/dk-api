import User from '../models/User';
import {Request, Response, NextFunction} from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SequelizeUniqueConstraintError } = require('sequelize');

async function register(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    try {
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        // let user = {
        //     email,
        //     hashedPassword
        // };
        try {
            const user = await User.create({
                email,
                password: hashedPassword
            });
    
            const payload = {
                id: user.id
            };

        jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" },
            (err:any, token:any) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
        } catch (err) {
            res.status(400).json("User already exists");
        }
        
    } catch (err) {
        next(err);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json("User does not exist");
        }

        const isMatch = await bcrypt.compare(password, user!.password);
        if (!isMatch) {
            res.status(400).json("Invalid Credentials");
        }
      
        const payload = {
            id: user!.id
        };
        jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" },
            (err:any, token:any) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
      next(err);
    }
  }

  export const registerFuncs = [register];
  export const loginFuncs = [login];
