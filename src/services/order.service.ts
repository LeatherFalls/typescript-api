import connection from '../models/connection';

import OrderModel from '../models/order.model';

import ModelOrder from '../interfaces/orderModel.interface';

import UserModel from '../models/user.model';

class OrderService {
  public model: OrderModel;

  public userModel: UserModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.userModel = new UserModel(connection);
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

    return orders as object[] as ModelOrder[];
  }

  public async create(userId: number) {
    const id = await this.model.create(userId);

    return id;
  }
}

export default OrderService;