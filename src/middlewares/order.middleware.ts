import { Request, Response, NextFunction } from 'express';

import OrderSchema from '../schemas/oder.schema';

class OrderMiddleware {
  constructor(private orderSchema = new OrderSchema()) {
    this.orderSchema = orderSchema;
  }

  public reqValidation = (req: Request, res: Response, next: NextFunction) => {
    const productsIds = req.body;

    const { error } = this.orderSchema.orderValidation.validate(productsIds);

    if (error) {
      const [status, message] = error.message.split('|');

      console.log(status);
      console.log(message);

      return res.status(Number(status)).json({ message });
    }

    next();
  };
}

export default OrderMiddleware;