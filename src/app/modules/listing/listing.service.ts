import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { IListing } from './listing.interface';
import { Listing } from './listing.model';
import { listingSearchableFields } from './listing.constant';

const createListingIntoDB = async (payload: IListing) => {
  const result = await Listing.create(payload);

  return result;
};

const getAllListingsFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  // const queryObj = { ...query };

  // TODO: Populate
  const bikeQuery = new QeryBuilder(
    Listing.find({ landLord: id }).populate('landLord'),
    query,
  )
    .search(listingSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;

  return result;
};

const getListingByIdFromDB = async (id: string) => {
  // check if listing exists by id
  const listing = await Listing.isListingExistById(id);

  if (!listing) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Listing not found');
  }
  const result = await Listing.findById(id);

  return result;
};

const updateListingByIdIntoDB = async (
  id: string,
  payload: Partial<IListing>,
) => {
  // check if listing exists by id
  const listing = await Listing.isListingExistById(id);

  if (!listing) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Listing not found');
  }

  // update the listing
  const result = await Listing.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteListingByIdFromDB = async (id: string) => {
  // check if listing exists by id
  const listing = await Listing.isListingExistById(id);

  if (!listing) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Listing not found');
  }

  // delete the listing
  const result = await Listing.findByIdAndDelete(id);

  return result;
};

export const ListingServices = {
  createListingIntoDB,
  getAllListingsFromDB,
  getListingByIdFromDB,
  updateListingByIdIntoDB,
  deleteListingByIdFromDB,
};
