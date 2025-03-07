import { Document, Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IListing } from '../listing/listing.interface';

export interface IRequest {
  listing: Types.ObjectId | IListing;
  tenant: Types.ObjectId | IUser;
  moveInDate: string;
  duration: number;
  rentalStatus: 'pending' | 'approved' | 'rejected';
  paymentStatus?: string;
  transactionId?: string;
  landlordPhone?: string;
}

export type RequestDocument = IRequest & Document;

export interface RequestModel extends Model<IRequest> {
  isRequestExistById(id: string): Promise<IRequest>;
}
