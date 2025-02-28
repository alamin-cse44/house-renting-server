import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  //   validateRequest(BikeValidations.createBikeValidaitonSchema),
  OrderControllers.createOrder,
);

router.get(
  '/by-email',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderControllers.getOrdersByEmail,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderControllers.getOrderById,
);


router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  //   validateRequest(BikeValidations.updateBikeValidaitonSchema),
  OrderControllers.updateOrderById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  OrderControllers.deleteOrderById,
);


router.get('/', auth(USER_ROLE.admin), OrderControllers.getAllOrders);

export const OrderRouters = router;
