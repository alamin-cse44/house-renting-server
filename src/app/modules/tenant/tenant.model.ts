import { model, Schema } from 'mongoose';
import { IRequest, RequestModel } from './tenant.interface';

const requestingSchema = new Schema<IRequest, RequestModel>(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    moveInDate: {
      type: String,
      required: [true, 'Please enter the move in date'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Please enter the duration of the rent'],
      validate: {
        validator: (value: number) => value >= 1,
        message: 'The duration must be a non-negative number',
      },
    },
    rentalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      default: 'pending',
    },
    transactionId: {
      type: String,
    },
    landlordPhone: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// check the user with the id
requestingSchema.statics.isRequestExistById = async function (id: string) {
  return await Request.findById(id);
};

export const Request = model<IRequest, RequestModel>(
  'Request',
  requestingSchema,
);
