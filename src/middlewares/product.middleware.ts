import { Request, Response, NextFunction, RequestHandler } from 'express';

import ProductSchema from '../schemas/product.schema';

class ProductMiddleware {
  constructor(private productSchema = new ProductSchema()) {
    this.productSchema = productSchema;
  }

  // handler
  public reqValidation: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { name, amount } = req.body;

    const { error } = this.productSchema.reqValidation.validate({ name, amount });

    if (error) {
      const [status, message] = error.message.split('|');

      console.log(status);
      console.log(message);

      return res.status(Number(status)).json({ message });
    }

    next();
  };
}

export default ProductMiddleware;