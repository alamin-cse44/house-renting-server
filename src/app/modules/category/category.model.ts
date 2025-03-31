import { model, Schema } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';

const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// check the user with the id
categorySchema.statics.isCategoryExistById = async function (id: string) {
  return await Category.findById(id);
};

export const Category = model<ICategory, CategoryModel>('Category', categorySchema);
