import { Request, Response, NextFunction } from 'express';

import UserSchema from '../schemas/user.schema';

import UserService from '../services/user.service';

class UserMiddleware {
  constructor(
    private userService = new UserService(),
    private userSchema = new UserSchema(),
  ) {
    this.userSchema = userSchema;
  }

  public userDataValidation = (req: Request, res: Response, next: NextFunction) => {
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

  public userApprovalValidation = async (req: Request, res: Response, next: NextFunction) => {
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

  public userValidation = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, level, classe } = req.body;

    const { error } = (
      this.userSchema.userValidation.validate({ username, password, level, classe })
    );

    if (error) {
      const [status, message] = error.message.split('|');

      return res.status(Number(status)).json({ message });
    }

    next();
  };
}

export default UserMiddleware;