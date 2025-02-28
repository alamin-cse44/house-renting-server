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

const deleteSignleUserByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.deleteSignleUserByIdFromDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
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

// const changeStatus = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await UserServices.changeStatus(id, req.body);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Status is updated succesfully',
//     data: result,
//   });
// });

export const UserControllers = {
  registerUser,
  getSignleUserById,
  deleteSignleUserByEmail,
  getAllUsers,
  getMe,
};
