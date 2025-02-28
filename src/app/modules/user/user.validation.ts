import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  }),
});

// const changeStatusValidationSchema = z.object({
//   body: z.object({
//     status: z.enum([...UserStatus] as [string, ...string[]]),
//   }),
// });

export const UserValidations = {
  createUserValidationSchema,
  // changeStatusValidationSchema
};
