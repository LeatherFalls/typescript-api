import { Request, Response, NextFunction } from 'express';

import connection from '../models/connection';

import UserModel from '../models/user.model';

import UserService from '../services/user.service';

class UserMiddleware {
  public model: UserModel;

  constructor(private userService = new UserService()) {
    this.model = new UserModel(connection);
  }

  public userValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username) {
        return res.status(400).json({ message: '"username" is required' });
      }

      if (!password) {
        return res.status(400).json({ message: '"password" is required' });
      }

      next();
    } catch (error) {
      next(error);
    }
  } ;

  public teste = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      const user = await this.userService.login(username, password);

      if (!user[0]) {
        return res.status(401).json({ message: 'Username or password invalid' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default UserMiddleware;