import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { userSearchableFields } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const getSignleUserByIdFromDB = async (email: string) => {
  const result = await User.findUserByEmail(email);

  return result;
};

const getMeService = async (email: string, role: string) => {
  const result = await User.findUserByEmail(email);

  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getSignleUserByIdFromDB,
  getMeService,
};
