import { Router } from 'express';

import UserController from '../controllers/user.controller';

import UserMiddleware from '../middlewares/user.middeware';

const userController = new UserController();

const userMiddleware = new UserMiddleware();

const userRouter = Router();

userRouter.post(
  '/',
  userMiddleware.userValidation,
  userController.create,
);

export default userRouter;