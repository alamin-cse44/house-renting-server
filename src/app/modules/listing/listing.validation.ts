import { z } from 'zod';

const createListingValidaitonSchema = z.object({
  body: z.object({
    landLord: z.string({ required_error: 'Must provide a LandLord' }),
    location: z.string(),
    description: z.string(),
    price: z.number().min(1).max(1000000),
    bedrooms: z.number().min(1).max(30),
  }),
});

const updateListingValidaitonSchema = z.object({
  body: z.object({
    landLord: z.string({ required_error: 'Must provide a LandLord' }),
    location: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(1).max(1000000).optional(),
    bedrooms: z.number().min(1).max(30).optional(),
  }),
});

export const ListingValidations = {
  createListingValidaitonSchema,
  updateListingValidaitonSchema,
};
