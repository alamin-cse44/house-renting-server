import { Model, Types } from 'mongoose';
import { IBike } from '../bike/bike.interface';

export interface ICart {
  userEmail: string;
  product: Types.ObjectId | IBike;
  quantity: number;
}

export interface CartModel extends Model<ICart> {
  isCartExistByEmailAndId(email: string, id: string): Promise<ICart>
}
