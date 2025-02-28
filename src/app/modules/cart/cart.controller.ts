import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from '../order/order.service';
import { CartServices } from './cart.service';

const createCart = catchAsync(async (req, res) => {
  const result = await CartServices.createCartIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart is created successfully',
    data: result,
  });
});

const getCartByEmail = catchAsync(async (req, res) => {
  const { email } = req.params;
  const result = await CartServices.getCartByEmailFromDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Carts are retrieved successfully',
    data: result,
  });
});

const updateCartById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.updateCartByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart is updated successfully',
    data: result,
  });
});

const deleteCartById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CartServices.deleteCartByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart is deleted successfully',
    data: result,
  });
});

export const CartControllers = {
  createCart,
  getCartByEmail,
  deleteCartById,
  updateCartById,
};
