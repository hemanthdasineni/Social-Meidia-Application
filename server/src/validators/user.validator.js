import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, 'Full name cannot be empty').max(50).optional(),
    bio: z.string().max(280, 'Bio cannot exceed 280 characters').optional(),
    website: z.string().max(100).optional(),
    location: z.string().max(100).optional(),
    isPrivate: z.boolean().optional(),
  }),
});
