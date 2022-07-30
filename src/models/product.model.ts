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
}

export default ProductModel;