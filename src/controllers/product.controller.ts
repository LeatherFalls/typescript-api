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

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();

    return res.status(200).json(products);
  };
}

export default ProductController;