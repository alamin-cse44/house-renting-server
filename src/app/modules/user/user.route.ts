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
  auth(USER_ROLE.admin, USER_ROLE.customer),
  UserControllers.getSignleUserById,
);

router.delete(
  '/delete-user/:email',
  auth(USER_ROLE.admin),
  UserControllers.deleteSignleUserByEmail,
);

// router.post(
//   '/change-status/:id',
//   auth('admin'),
//   validateRequest(UserValidations.changeStatusValidationSchema),
//   UserControllers.changeStatus,
// );

router.get('/all-users', auth('admin'), UserControllers.getAllUsers);

router.get('/me', auth('admin', 'customer'), UserControllers.getMe);

export const UserRouters = router;
