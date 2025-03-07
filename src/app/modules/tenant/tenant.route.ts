import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { RequestControllers } from './tenant.controller';
import { RequestValidations } from './tenant.validation';

const router = express.Router();

router.post(
  '/requests',
  auth(USER_ROLE.tenant, USER_ROLE.admin),
  validateRequest(RequestValidations.createRequestValidaitonSchema),
  RequestControllers.createRequest,
);

// router.get('/', auth(USER_ROLE.landLord), ListingControllers.getAllListings);

// router.get('/:id', ListingControllers.getListingById);

// router.patch(
//   '/:id',
//   auth(USER_ROLE.landLord, USER_ROLE.admin),
//   validateRequest(ListingValidations.updateListingValidaitonSchema),
//   ListingControllers.updateListingById,
// );

// router.delete(
//   '/:id',
//   auth(USER_ROLE.landLord),
//   ListingControllers.deleteListingById,
// );

export const RequestRouters = router;
