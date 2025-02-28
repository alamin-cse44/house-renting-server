import { model, Schema } from 'mongoose';
import { BikeModel, IBike } from './bike.interface';

const bikeSchema = new Schema<IBike, BikeModel>(
  {
    name: {
      type: String,
      required: [true, 'Please enter a bike name'],
      unique: true,
      trim: true,
    },
    categories: {
      type: String,
      enum: ['Sport', 'Cruiser', 'Adventure', 'Naked', 'Dirt'],
      required: [
        true,
        'Category should be Sport or Cruiser or Adventure or Naked or Dirt',
      ],
    },
    brand: {
      type: String,
      enum: ['Yamaha', 'Honda', 'Suzuki', 'Ducati', 'Kawaski'],
      required: [
        true,
        'Brand should be Yamaha or Honda or Suzuki or Ducati or Kawaski',
      ],
    },
    model: {
      type: String,
      required: [true, 'Please enter a model name'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please the quantity of the bike'],
      validate: {
        validator: (value: number) => value >= 0,
        message: 'The bike quantity must be a non-negative number',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price must be provided'],
      validate: {
        validator: (value: number) => value > 0,
        message: 'The bike price must be a positive number',
      },
    },
    stock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// check the user with the id
bikeSchema.statics.isBikeExistById = async function (id: string) {
  return await Bike.findById(id);
};

export const Bike = model<IBike, BikeModel>('Bike', bikeSchema);
