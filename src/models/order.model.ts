import { Pool } from 'mysql2/promise';

import ModelOrder from '../interfaces/orderModel.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<ModelOrder[]> {
    const query = `
      SELECT o.id, o.userId, GROUP_CONCAT(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON o.id = p.orderId
      GROUP BY o.id
      ORDER BY o.userId ASC
    `;

    const [result] = await this.connection.query(query);

    return result as ModelOrder[];
  }
}

export default OrderModel;