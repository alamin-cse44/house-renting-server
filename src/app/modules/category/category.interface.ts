import { Document, Model } from 'mongoose';

export interface ICategory {
  title: string;
  icon: string;
}

export type CategoryDocument = ICategory & Document;

export interface CategoryModel extends Model<ICategory> {
  isCategoryExistById(id: string): Promise<ICategory>;
}
