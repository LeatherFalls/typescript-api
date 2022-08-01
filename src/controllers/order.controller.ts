import { Request, Response } from 'express';

import OrderService from '../services/order.service';

class OrderController {
  constructor(private service = new OrderService()) {
    this.service = service;
  }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.service.getAll();

    return res.status(200).json(orders);
  };
}

export default OrderController;