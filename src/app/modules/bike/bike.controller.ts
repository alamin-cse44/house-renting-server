import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike is created successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bikes are retrieved successfully',
    data: result,
  });
});

const getBikeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.getBikeByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike is retrieved successfully',
    data: result,
  });
});

const updateBikeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.updateBikeByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike is updated successfully',
    data: result,
  });
});

const deleteBikeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.deleteBikeByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bike is deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBikeById,
  deleteBikeById,
};
