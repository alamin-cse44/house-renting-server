import { model, Schema } from 'mongoose';
import { IListing, ListingModel } from './listing.interface';

const listingSchema = new Schema<IListing, ListingModel>(
  {
    apartmentType: {
      type: String,
      required: true,
    },
    landLord: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
      required: [true, 'Please enter the house location'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter the price of the house'],
      validate: {
        validator: (value: number) => value >= 0,
        message: 'The house price must be a non-negative number',
      },
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please enter the rooms of the house'],
      validate: {
        validator: (value: number) => value > 0,
        message: 'The house price must be a positive number',
      },
    },
    image: [
      {
        url: { type: String, required: true },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// check the user with the id
listingSchema.statics.isListingExistById = async function (id: string) {
  return await Listing.findById(id);
};

export const Listing = model<IListing, ListingModel>('Listing', listingSchema);
