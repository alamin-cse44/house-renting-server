import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ICart } from './cart.interface';
import { Cart } from './cart.model';

const createCartIntoDB = async (payload: ICart) => {
  const { userEmail, product } = payload;

  const existingCartItem = await Cart.findOne({ userEmail, product });

  if (existingCartItem) {
    existingCartItem.quantity += 1;
    await existingCartItem.save();
    console.log('Cart item quantity updated successfully');

    return existingCartItem;
  }

  const result = await Cart.create(payload);

  return result;
};

const getCartByEmailFromDB = async (email: string) => {
  const result = await Cart.find({ userEmail: email }).populate('product');

  return result;
};

const updateCartByIdIntoDB = async (id: string, payload: Partial<ICart>) => {
  const cart = await Cart.findById(id);

  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart not found');
  }

  const result = await Cart.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteCartByIdFromDB = async (id: string) => {
  const cart = await Cart.findById(id);

  if (!cart) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart not found');
  }

  // delete the cart
  const result = await Cart.findByIdAndDelete(id);

  return result;
};

export const CartServices = {
  createCartIntoDB,
  getCartByEmailFromDB,
  deleteCartByIdFromDB,
  updateCartByIdIntoDB,
};
