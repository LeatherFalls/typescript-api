import { Pool, ResultSetHeader } from 'mysql2/promise';

import Product from '../interfaces/product.interface';

class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;

    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';

    const [dataInsertId] = await this.connection.query<ResultSetHeader>(query, [name, amount]);

    const { insertId } = dataInsertId;

    const result = {
      id: insertId,
      ...product,
    };

    return result;
  }

  public async getAll(): Promise<Product[]> {
    const query = 'SELECT * FROM Trybesmith.Products ORDER BY id ASC';

    const [result] = await this.connection.query(query);

    return result as Product[];
  }

  public async update(orderId: number, productsIds: number[]) {
    const [{ affectedRows }] = await this.connection.query<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id IN (?)',
      [orderId, productsIds],
    );

    return affectedRows;
  }
}

export default ProductModel;