import { z } from 'zod';

const createRequestValidaitonSchema = z.object({
  body: z.object({
    listing: z.string({ required_error: 'Must provide Listing' }),
    tenant: z.string({ required_error: 'Must provide a Tenant' }),
    landlord: z.string({ required_error: 'Must provide a Landlord' }),
    moveInDate: z.string({ required_error: 'Move In Date must be provided' }),
    duration: z.number().min(1).max(22),
    rentalStatus: z.string({
      required_error: 'Rental Status must be provided',
    }),
  }),
});

const updateRequestValidaitonSchema = z.object({
  body: z.object({
    listing: z.string({ required_error: 'Must provide Listing' }).optional(),
    tenant: z.string({ required_error: 'Must provide a Tenant' }).optional(),
    landlord: z
      .string({ required_error: 'Must provide a Landlord' })
      .optional(),
    moveInDate: z
      .string({ required_error: 'Move In Date must be provided' })
      .optional(),
    duration: z.number().min(1).max(22).optional(),
    rentalStatus: z
      .string({ required_error: 'Rental Status must be provided' })
      .optional(),
  }),
});

export const RequestValidations = {
  createRequestValidaitonSchema,
  updateRequestValidaitonSchema,
};
