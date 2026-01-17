import { z } from 'zod';

export const createFranchiseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
});

export const franchiseIdSchema = z.string().min(1, 'Franchise ID is required');

export type CreateFranchiseInput = z.infer<typeof createFranchiseSchema>;
