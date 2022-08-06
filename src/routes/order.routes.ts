import { Router } from 'express';

import OrderController from '../controllers/order.controller';

import OrderMiddleware from '../middlewares/order.middleware';

import TokenMiddleware from '../middlewares/token.middleware';

const orderController = new OrderController();

const orderMiddleware = new OrderMiddleware();

const tokenMddleware = new TokenMiddleware();

const orderRouter = Router();

orderRouter.get(
  '/',
  orderController.getAll,
);

orderRouter.post(
  '/',
  tokenMddleware.validateToken,
  orderMiddleware.reqValidation,
  orderController.create,
);

export default orderRouter;