import { Document, Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IListing {
  apartmentType: string;
  landLord: Types.ObjectId | IUser;
  location: string;
  description: string;
  price: number;
  bedrooms: number;
  image?: string[];
}

export type ListingDocument = IListing & Document;

export interface ListingModel extends Model<IListing> {
  isListingExistById(id: string): Promise<IListing>;
}
