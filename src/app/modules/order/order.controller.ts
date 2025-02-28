import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order is created successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders are retrieved successfully',
    data: result,
  });
});

const getOrdersByEmail = catchAsync(async (req, res) => {
  // const { email } = req.params;
  const { userEmail } = req.user;
  const result = await OrderServices.getOrdersByEmailFromDB(userEmail, req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders by email are retrieved successfully',
    data: result,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.getOrderByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order is retrieved successfully',
    data: result,
  });
});

const updateOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.updateOrderByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order is updated successfully',
    data: result,
  });
});

const deleteOrderById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderServices.deleteOrderByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order is deleted successfully',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
