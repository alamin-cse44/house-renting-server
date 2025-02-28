import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBike } from '../bike/bike.interface';

export interface IOrder {
  email: string;
  customer: Types.ObjectId | IUser;
  product: Types.ObjectId | IBike;
  totalPrice: number;
  orderStatus: 'pending' | 'confirmed' | 'delivered' | 'cancel';
  quantity: number;
  address: string;
  phone: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'success';
  transactionId: string;
}

export interface OrderModel extends Model<IOrder> {
  isOrderExistById(id: string): Promise<IOrder>;
}
