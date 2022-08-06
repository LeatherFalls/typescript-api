import { NextFunction, Request, Response } from 'express';

import OrderService from '../services/order.service';

import JwtService from '../services/jwt.service';

import ProductService from '../services/product.service';

class OrderController {
  constructor(
    private service = new OrderService(),
    private jwtService = new JwtService(),
    private productService = new ProductService(),
  ) {
    this.service = service;
    this.jwtService = jwtService;
    this.productService = productService;
  }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.service.getAll();

    return res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productsIds } = req.body;

      const { authorization: token } = req.headers;
      
      if (!token) return;

      const userId = await this.jwtService.verifyToken(token);

      const orderId = await this.service.create(userId);

      await this.productService.update(orderId, productsIds);
  
      return res.status(201).json({ userId, productsIds });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;