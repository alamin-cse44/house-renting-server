import { z } from 'zod';
import { UserStatus } from './user.constant';


const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    role: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  changeStatusValidationSchema,
};
