import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { CategoryValidations } from './category.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidations.createCategoryValidaitonSchema),
  CategoryControllers.createCategory,
);

router.get('/', CategoryControllers.getAllCategories);

router.get('/:id', CategoryControllers.getCategoryById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidations.updateCategoryValidaitonSchema),
  CategoryControllers.updateCategoryById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  CategoryControllers.deleteCategoryById,
);

export const CategoryRouters = router;
