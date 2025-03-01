import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getSignleUserById = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getSignleUserByIdFromDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});



const getMe = catchAsync(async (req, res) => {
  console.log('get me', req.user);
  const { userEmail, userRole } = req.user;

  const result = await UserServices.getMeService(userEmail, userRole);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});



export const UserControllers = {
  registerUser,
  getSignleUserById,
  // getMe,
};
