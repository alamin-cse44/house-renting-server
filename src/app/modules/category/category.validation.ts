import { z } from 'zod';

const createCategoryValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }),
    icon: z.string({ required_error: 'Must provide category icon' }),
  }),
});

const updateCategoryValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }).optional(),
    icon: z.string({ required_error: 'Must provide category icon' }).optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidaitonSchema,
  updateCategoryValidaitonSchema,
};
