import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUserByIdByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await AdminServices.blockUserByIdByAdminFromDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User is blocked successfully',
    success: true,
    data: result,
  });
});



export const AdminControllers = {
  blockUserByIdByAdmin,
};
