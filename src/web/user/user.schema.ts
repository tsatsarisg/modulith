import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const userIdSchema = z.string().min(1, 'User ID is required');

export type CreateUserInput = z.infer<typeof createUserSchema>;
