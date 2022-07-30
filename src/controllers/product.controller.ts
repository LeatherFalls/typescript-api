import { Request, Response } from 'express';

import ProductService from '../services/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {
    this.productService = productService;
  }

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const product = await this.productService.create({ name, amount });

    return res.status(201).json(product);
  };
}

export default ProductController;