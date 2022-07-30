import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

class JwtService {
  constructor(private secret = 'testSecret') {
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
}

export default JwtService;