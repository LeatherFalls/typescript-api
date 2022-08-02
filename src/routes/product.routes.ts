import { Router } from 'express';

import ProductController from '../controllers/product.controller';

import ProductMiddleware from '../middlewares/product.middleware';

const productController = new ProductController();

const productMiddleware = new ProductMiddleware();

const productRouter = Router();

productRouter.post(
  '/',
  productMiddleware.reqValidation,
  productController.create,
);

productRouter.get(
  '/',
  productController.getAll,
);

export default productRouter;