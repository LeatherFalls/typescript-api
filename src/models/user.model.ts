import { Pool, ResultSetHeader } from 'mysql2/promise';

import User from '../interfaces/user.interface';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;

    const query = (
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)'
    );

    const [dataInsertId] = (
      await this.connection.query<ResultSetHeader>(query, [username, classe, level, password])
    );

    const { insertId } = dataInsertId;

    const result = {
      id: insertId,
      ...user,
    };

    return result;
  }
}

export default UserModel;