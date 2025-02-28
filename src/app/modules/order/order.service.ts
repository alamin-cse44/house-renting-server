import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { IOrder } from './order.interface';
import { Order } from './order.model';
import { orderSearchableFields } from './order.constant';

const createOrderIntoDB = async (payload: IOrder) => {
  const result = await Order.create(payload);

  return result;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QeryBuilder(
    Order.find().populate('customer').populate('product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  return result;
};

const getOrdersByEmailFromDB = async (
  email: string,
  query: Record<string, unknown>,
) => {
  const orderQuery = new QeryBuilder(
    Order.find({ email }).populate('customer').populate('product'),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;

  return result;
};

const getOrderByIdFromDB = async (id: string) => {
  const order = await Order.isOrderExistById(id);

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  const result = await Order.findById(id)
    .populate('customer')
    .populate('product');

  return result;
};

const updateOrderByIdIntoDB = async (id: string, payload: Partial<IOrder>) => {
  // check if order exists by id
  const order = await Order.isOrderExistById(id);

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  // TODO: check orderer ==== order updater

  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteOrderByIdFromDB = async (id: string) => {
  // check if bike exists by id
  const order = await Order.isOrderExistById(id);

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  // delete the blog
  const result = await Order.findByIdAndDelete(id);

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
  getOrderByIdFromDB,
  updateOrderByIdIntoDB,
  deleteOrderByIdFromDB,
};
