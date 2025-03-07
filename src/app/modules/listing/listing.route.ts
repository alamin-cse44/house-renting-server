import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ListingValidations } from './listing.validation';
import { ListingControllers } from './listing.controller';

const router = express.Router();

router.post(
  '/listings',
  auth(USER_ROLE.landLord, USER_ROLE.admin),
  validateRequest(ListingValidations.createListingValidaitonSchema),
  ListingControllers.createListing,
);

router.get(
  '/listings',
  auth(USER_ROLE.landLord),
  ListingControllers.getAllListings,
);

router.get(
  '/requests',
  auth(USER_ROLE.landLord, USER_ROLE.admin),
  ListingControllers.getAllRequests,
);

router.get('/listings/:id', ListingControllers.getListingById);

router.patch(
  '/listings/:id',
  auth(USER_ROLE.landLord, USER_ROLE.admin),
  validateRequest(ListingValidations.updateListingValidaitonSchema),
  ListingControllers.updateListingById,
);

router.delete(
  '/listings/:id',
  auth(USER_ROLE.landLord),
  ListingControllers.deleteListingById,
);

export const ListingRouters = router;
