import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer';
  isBlocked: boolean;
  image: string;
}

export interface UserModel extends Model<IUser> {
  isUserExistById(id: string): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
