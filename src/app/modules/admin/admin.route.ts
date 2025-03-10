import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from './admin.validation';
import { ListingValidations } from '../listing/listing.validation';
import { ListingControllers } from '../listing/listing.controller';

const router = express.Router();

router.patch(
  '/users/:id',
  auth('admin'),
  // validateRequest(AdminValidations.updateUserRoleValidationSchema),
  AdminControllers.updateRole,
);

router.delete('/user/:id', auth('admin'), AdminControllers.blockSignleUserById);

router.patch(
  '/listings/:id',
  auth('admin', 'landLord'),
  validateRequest(ListingValidations.updateListingValidaitonSchema),
  ListingControllers.updateListingById,
);

router.get(
  '/listings/:id',
  auth('admin', 'landLord'),
  ListingControllers.getListingById,
);

router.delete(
  '/listings/:id',
  auth('admin'),
  ListingControllers.deleteListingById,
);

router.get('/listings', AdminControllers.getAllListings);

router.get('/users', auth('admin'), AdminControllers.getAllUsers);

export const AdminRouters = router;
