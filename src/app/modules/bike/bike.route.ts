import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BikeValidations } from './bike.validation';
import validateRequest from '../../middlewares/validateRequest';
import { BikeControllers } from './bike.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidations.createBikeValidaitonSchema),
  BikeControllers.createBike,
);

router.get('/', BikeControllers.getAllBikes);

router.get('/:id', BikeControllers.getBikeById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidations.updateBikeValidaitonSchema),
  BikeControllers.updateBikeById,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBikeById);

export const BikeRouters = router;
