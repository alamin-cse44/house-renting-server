import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { IBike } from './bike.interface';
import { Bike } from './bike.model';
import { bikeSearchableFields } from './bike.constant';

const createBikeIntoDB = async (payload: IBike) => {
  const result = await Bike.create(payload);

  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // TODO: Populate
  const bikeQuery = new QeryBuilder(Bike.find().populate(''), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await bikeQuery.modelQuery;

  return result;
};

const getBikeByIdFromDB = async (id: string) => {
  // check if bike exists by id
  const bike = await Bike.isBikeExistById(id);

  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }
  const result = await Bike.findById(id);

  return result;
};

const updateBikeByIdIntoDB = async (id: string, payload: Partial<IBike>) => {
  // check if bike exists by id
  const bike = await Bike.isBikeExistById(id);

  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }

  // update the bike
  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBikeByIdFromDB = async (id: string) => {
  // check if bike exists by id
  const bike = await Bike.isBikeExistById(id);

  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }

  // delete the bike
  const result = await Bike.findByIdAndDelete(id);

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getBikeByIdFromDB,
  updateBikeByIdIntoDB,
  deleteBikeByIdFromDB,
};
