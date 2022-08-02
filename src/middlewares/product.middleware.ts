import { Request, Response, NextFunction } from 'express';

import ProductSchema from '../schemas/product.schema';

class ProductMiddleware {
  constructor(private productSchema = new ProductSchema()) {
    this.productSchema = productSchema;
  }

  public reqValidation = (req: Request, res: Response, next: NextFunction) => {
    const { name, amount } = req.body;

    const { error } = this.productSchema.reqValidation.validate({ name, amount });

    if (error) {
      const [status, message] = error.message.split('|');

      return res.status(Number(status)).json({ message });
    }

    next();
  };
}

export default ProductMiddleware;