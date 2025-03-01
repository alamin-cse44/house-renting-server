import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ListingValidations } from './listing.validation';
import { ListingControllers } from './listing.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.landLord),
  validateRequest(ListingValidations.createListingValidaitonSchema),
  ListingControllers.createListing,
);

router.get('/', auth(USER_ROLE.landLord), ListingControllers.getAllListings);

router.get('/:id', auth(USER_ROLE.landLord), ListingControllers.getListingById);

router.patch(
  '/:id',
  auth(USER_ROLE.landLord),
  validateRequest(ListingValidations.updateListingValidaitonSchema),
  ListingControllers.updateListingById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.landLord),
  ListingControllers.deleteListingById,
);

export const ListingRouters = router;
