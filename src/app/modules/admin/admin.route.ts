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
  validateRequest(AdminValidations.updateUserRoleValidationSchema),
  AdminControllers.updateRole,
);


router.delete(
  '/user/:email',
  auth('admin'),
  AdminControllers.blockSignleUserByEmail,
);

router.patch(
  '/listings/:id',
  auth('admin'),
  validateRequest(ListingValidations.updateListingValidaitonSchema),
  ListingControllers.updateListingById,
);

router.delete(
  '/listings/:id',
  auth('admin'),
  ListingControllers.deleteListingById,
);

router.get('/listings', AdminControllers.getAllListings);

router.get('/users', auth('admin'), AdminControllers.getAllUsers);

export const AdminRouters = router;
