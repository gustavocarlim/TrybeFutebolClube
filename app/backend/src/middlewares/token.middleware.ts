import { NextFunction, Request, Response } from 'express';
import * as JWT from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'insiraOSegredoCorreto';

function filteredToken(rawToken: string) {
  return rawToken.split(' ')[1];
}

export default class TokenValidation {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization || authorization === '') {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = filteredToken(authorization);

    try {
      const user = JWT.verify(token, SECRET_KEY);

      if (!user) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }

      req.body.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
