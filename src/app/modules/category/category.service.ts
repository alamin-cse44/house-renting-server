import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import { categorySearchableFields } from './category.constant';

const createCategoryIntoDB = async (payload: ICategory) => {
  const result = await Category.create(payload);

  return result;
};

const getAllCategoriesFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QeryBuilder(Category.find(), query)
    .search(categorySearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await categoryQuery.modelQuery;

  return result;
};

const getCategoryByIdFromDB = async (id: string) => {
  // check if category exists by id
  const category = await Category.isCategoryExistById(id);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }
  const result = await Category.findById(id);

  return result;
};

const updateCategoryByIdIntoDB = async (id: string, payload: Partial<ICategory>) => {
  // check if category exists by id
  const category = await Category.isCategoryExistById(id);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  // update the category
  const result = await Category.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCategoryByIdFromDB = async (id: string) => {
  // check if category exists by id
  const category = await Category.isCategoryExistById(id);

  if (!category) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Category not found');
  }

  // delete the category
  const result = await Category.findByIdAndDelete(id);

  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getCategoryByIdFromDB,
  updateCategoryByIdIntoDB,
  deleteCategoryByIdFromDB,
};
