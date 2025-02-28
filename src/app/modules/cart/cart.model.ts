import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { BikeDocument } from '../bike/bike.interface';
import { CartModel, ICart } from './cart.interface';

const cartSchema = new Schema<ICart, CartModel>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: true,
    },
    quantity: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  },
);

cartSchema.pre('save', async function (next) {
  try {
    // Ensure the product is found in the database
    const product = (await this.model('Bike').findById(
      this.product,
    )) as BikeDocument;

    if (!product) {
      // console.log('product pawa jayni');
      return next(new AppError(StatusCodes.NOT_FOUND, 'Product not found'));
    }

    // If new entry, set quantity to 1
    if (!this.quantity) {
      this.quantity = 1;
    }

    // Proceed to the next middleware or save operation
    next();
  } catch (error) {
    next();
  }
});

cartSchema.statics.isCartExistByEmailAndId = async function (email: string, id: string) {
  return await Cart.findOne({userEmail: email, id: id});
};

export const Cart = model<ICart, CartModel>('Cart', cartSchema);
