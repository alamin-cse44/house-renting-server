import { model, Schema } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { BikeDocument } from '../bike/bike.interface';

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    email: {
      type: String,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Bike',
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
      default: 'pending',
    },
    quantity: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success'],
      default: 'pending',
    },
    transactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

orderSchema.pre('save', async function (next) {
  try {
    // Ensure the product is found in the database
    const product = (await this.model('Bike').findById(
      this.product,
    )) as BikeDocument;

    if (!product) {
      return next(new AppError(StatusCodes.NOT_FOUND, 'Product not found'));
    }

    // Check if there is enough stock to fulfill the order
    if (product.quantity < this.quantity) {
      return next(
        new AppError(StatusCodes.FORBIDDEN, 'Not enough quantity in stock'),
      );
    }

    // Deduct the ordered quantity from the product's stock
    product.quantity -= this.quantity;

    // Update the totalPrice based on product price and order quantity
    this.totalPrice = product.price * this.quantity;

    // If stock becomes zero, update the stock status
    if (product.quantity === 0) {
      product.stock = false;
    }

    // Save the updated product back to the database
    await product.save();

    // Proceed to the next middleware or save operation
    next();
  } catch (error) {
    next();
  }
});

orderSchema.statics.isOrderExistById = async function (id: string) {
  return await Order.findById(id);
};

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
