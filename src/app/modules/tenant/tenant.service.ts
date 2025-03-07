import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { Request } from './tenant.model';
import { IRequest } from './tenant.interface';
import { requestSearchableFields } from './tanant.constant';

const createRequestIntoDB = async (payload: IRequest) => {
  const result = await Request.create(payload);

  return result;
};

const getAllRequestsFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  // TODO: Populate
  const requestQuery = new QeryBuilder(
    Request.find({ tenant: id })
      .populate('listing')
      .populate('tenant')
      .populate('landlord'),
    query,
  )
    .search(requestSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await requestQuery.modelQuery;

  return result;
};

// const getListingByIdFromDB = async (id: string) => {
//   // check if listing exists by id
//   const listing = await Listing.isListingExistById(id);

//   if (!listing) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'Listing not found');
//   }
//   const result = await Listing.findById(id).populate("landLord");

//   return result;
// };

// const updateListingByIdIntoDB = async (
//   id: string,
//   payload: Partial<IListing>,
// ) => {
//   // check if listing exists by id
//   const listing = await Listing.isListingExistById(id);

//   if (!listing) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'Listing not found');
//   }

//   // update the listing
//   const result = await Listing.findByIdAndUpdate(id, payload, {
//     new: true,
//     runValidators: true,
//   });

//   return result;
// };

// const deleteListingByIdFromDB = async (id: string) => {
//   // check if listing exists by id
//   const listing = await Listing.isListingExistById(id);

//   if (!listing) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'Listing not found');
//   }

//   // delete the listing
//   const result = await Listing.findByIdAndDelete(id);

//   return result;
// };

export const RequestServices = {
  createRequestIntoDB,
  getAllRequestsFromDB,
};
