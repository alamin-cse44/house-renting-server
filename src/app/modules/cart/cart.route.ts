import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { CartControllers } from './cart.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  //   validateRequest(BikeValidations.createBikeValidaitonSchema),
  CartControllers.createCart,
);

router.get(
  '/:email',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  CartControllers.getCartByEmail,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  //   validateRequest(BikeValidations.updateBikeValidaitonSchema),
  CartControllers.updateCartById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.customer),
  CartControllers.deleteCartById,
);

export const CartRouters = router;
