import { User } from '../user/user.model';
import { userSearchableFields } from '../user/user.constant';
import QeryBuilder from '../../builder/QeryBuilder';
import { Listing } from '../listing/listing.model';
import { listingSearchableFields } from '../listing/listing.constant';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QeryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;

  return result;
};

const updateRoleService = async (id: string, payload: { role: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const blockSignleUserByIdFromDB = async (email: string) => {
  const user = await User.findUserByEmail(email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const result = await User.findOneAndUpdate(
    { email },
    { isBlocked: !user?.isBlocked },
    { new: true, runValidators: true },
  );

  return result;
};

const getAllListingsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // TODO: Populate
  const bikeQuery = new QeryBuilder(Listing.find().populate('landLord'), query)
    .search(listingSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;

  return result;
};

export const AdminServices = {
  getAllUsersFromDB,
  updateRoleService,
  getAllListingsFromDB,
  blockSignleUserByIdFromDB,
};
