import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ListingServices } from './listing.service';

const createListing = catchAsync(async (req, res) => {
  const result = await ListingServices.createListingIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listing is created successfully',
    data: result,
  });
});

const getAllListings = catchAsync(async (req, res) => {
  //   console.log('req user', req.user);
  const { userId } = req.user;
  const result = await ListingServices.getAllListingsFromDB(userId, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listings are retrieved successfully',
    data: result,
  });
});

const getAllRequests = catchAsync(async (req, res) => {
  //   console.log('req user', req.user);
  const { userId } = req.user;
  const result = await ListingServices.getAllRequestsFromDB(userId, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Requests are retrieved successfully',
    data: result,
  });
});

const getListingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ListingServices.getListingByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listing is retrieved successfully',
    data: result,
  });
});

const updateListingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ListingServices.updateListingByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listing is updated successfully',
    data: result,
  });
});

const deleteListingById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ListingServices.deleteListingByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listing is deleted successfully',
    data: result,
  });
});

export const ListingControllers = {
  createListing,
  getAllListings,
  getAllRequests,
  getListingById,
  updateListingById,
  deleteListingById,
};
