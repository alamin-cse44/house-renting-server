import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const blockUserByIdByAdminFromDB = async (
  id: string,
  payload: Partial<IUser>,
) => {
  const user = await User.isUserExistById(id);

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User does not exist');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};


export const AdminServices = {
  blockUserByIdByAdminFromDB,
};
