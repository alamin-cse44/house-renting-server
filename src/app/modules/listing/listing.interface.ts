import { Document, Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IListing {
  apartmentType: string;
  landLord: Types.ObjectId | IUser;
  location: string;
  description: string;
  discount?: string;
  price: number;
  bedrooms: number;
  image: { url: string }[];
  category:
    | 'familyHouse'
    | 'bachelorMess'
    | 'femaleMess'
    | 'office'
    | 'warehouse';
}

export type ListingDocument = IListing & Document;

export interface ListingModel extends Model<IListing> {
  isListingExistById(id: string): Promise<IListing>;
}
