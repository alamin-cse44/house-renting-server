import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post(
  '/',
//   auth(USER_ROLE.admin, USER_ROLE.customer),
  PaymentControllers.createPayment,
);

router.post(
  '/success',
//   auth(USER_ROLE.admin, USER_ROLE.customer),
  PaymentControllers.succesPayment,
);
router.post('/fail', PaymentControllers.failPayment);
router.post('/cancel', PaymentControllers.cancelPayment);

export const PaymentRouters = router;
