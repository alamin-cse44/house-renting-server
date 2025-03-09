import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestServices } from './tenant.service';

const createRequest = catchAsync(async (req, res) => {
  const result = await RequestServices.createRequestIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Request is created successfully',
    data: result,
  });
});

const getAllRequests = catchAsync(async (req, res) => {
//   console.log('req user', req.user);
  const { userId } = req.user;
  const result = await RequestServices.getAllRequestsFromDB(userId, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Requests are retrieved successfully',
    data: result,
  });
});


export const RequestControllers = {
  createRequest,
  getAllRequests,
};
