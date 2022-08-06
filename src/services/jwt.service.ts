import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import connection from '../models/connection';

import Token from '../interfaces/token.interface';

import User from '../interfaces/user.interface';

import UserModel from '../models/user.model';

dotenv.config();

class JwtService {
  constructor(
    public secret = 'testSecret',
    private model = new UserModel(connection),
  ) {
    this.secret = secret;
  }

  public create(username: string, password: string): string {
    return jwt.sign(
      { 
        data: { 
          username,
          password,
        },
      },
      this.secret,
      {
        expiresIn: '5d',
        algorithm: 'HS256',
      },
    );
  }

  public verifyToken = async (token: string) => {
    let decodedUser = '';

    const { data } = jwt.verify(token, this.secret) as Token;

    const { username } = data as User;

    decodedUser = username;

    const { id } = await this.model.getByName(decodedUser);

    return id;
  };
}

export default JwtService;