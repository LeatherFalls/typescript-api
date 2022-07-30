import { Request, Response } from 'express';

import JwtService from '../services/jwt.service';

import UserService from '../services/user.service';

class UserController {
  constructor(
    private userService = new UserService(),
    private jwtService = new JwtService(),
  ) {}

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;

    await this.userService.create({ username, classe, level, password });
    
    const token = this.jwtService.create(username, password);

    return res.status(201).json({ token });
  };
}

export default UserController;