import express from 'express';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.registerUser,
);

router.get(
  '/single-user/:email',
  auth(USER_ROLE.admin, USER_ROLE.landLord, USER_ROLE.tenant),
  UserControllers.getSignleUserById,
);
router.patch(
  '/update-me',
  auth(USER_ROLE.admin, USER_ROLE.landLord, USER_ROLE.tenant),
  UserControllers.updateMe,
);

router.get('/me', auth('admin', 'landLord', 'tenant'), UserControllers.getMe);

export const UserRouters = router;
