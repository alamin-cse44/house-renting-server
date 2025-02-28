import { z } from 'zod';

const createBikeValidaitonSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(40),
    categories: z.string().min(3).max(40),
    brand: z.string().min(3).max(30),
    price: z.number().min(1).max(1000000),
    model: z.string({ required_error: 'required' }),
    quantity: z.number().min(1).max(500),
  }),
});

const updateBikeValidaitonSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(40).optional(),
    categories: z.string().min(3).max(40).optional(),
    brand: z.string().min(3).max(40).optional(),
    model: z.string({ required_error: 'required' }).optional(),
    price: z.number().min(1).max(1000000).optional(),
    quantity: z.number().min(1).max(500).optional(),
  }),
});

export const BikeValidations = {
  createBikeValidaitonSchema,
  updateBikeValidaitonSchema,
};
