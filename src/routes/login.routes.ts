import { Router } from 'express';

import UserController from '../controllers/user.controller';

import UserMiddleware from '../middlewares/user.middeware';

const userController = new UserController();

const loginRouter = Router();

const userMiddleware = new UserMiddleware();

loginRouter.post(
  '/',
  userMiddleware.userDataValidation,
  userMiddleware.userApprovalValidation,
  userController.login,
);

export default loginRouter;