import connection from '../models/connection';

import OrderModel from '../models/order.model';

import ModelOrder from '../interfaces/orderModel.interface';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<ModelOrder[]> {
    const modelResult = await this.model.getAll();
    
    const orders = modelResult.map((order) => {
      const split = order.productsIds.split(',');
      const productsIds = split.map((id: string) => Number(id));
      
      return {
        ...order,
        productsIds,
      };
    });

    console.log(orders);

    return orders as object[] as ModelOrder[];
  }
}

export default OrderService;