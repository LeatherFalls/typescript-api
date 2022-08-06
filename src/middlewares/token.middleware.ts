import { RequestHandler } from 'express';

import jwt from 'jsonwebtoken';

import User from '../interfaces/user.interface';

import JwtService from '../services/jwt.service';

class TokenMiddleware {
  public jwtService = new JwtService();

  public validateToken:RequestHandler = (req, res, next) => {
    const { authorization: token } = req.headers;

    if (!token) {
      res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(String(token), this.jwtService.secret, (error, user) => {
      if (error) {
        res.status(401).json({ message: 'Invalid token' });
      }

      const { id } = user as User;
      res.locals.userId = id;
    });

    next();
  };
}

export default TokenMiddleware;