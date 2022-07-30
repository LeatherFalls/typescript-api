import { Router } from 'express';

import ProductController from '../controllers/product.controller';

const productController = new ProductController();

const productRouter = Router();

productRouter.post(
  '/',
  productController.create,
);

productRouter.get(
  '/',
  productController.getAll,
);

export default productRouter;