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

router.get(
  '/requests',
  auth(USER_ROLE.admin, USER_ROLE.tenant),
  RequestControllers.getAllRequests,
);


export const RequestRouters = router;
