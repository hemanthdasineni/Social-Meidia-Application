import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    caption: z.string().max(2200, 'Caption cannot exceed 2200 characters').optional().default(''),
    tags: z.union([z.array(z.string()), z.string()]).optional(),
    location: z.string().max(100, 'Location too long').optional().default(''),
    mediaUrls: z.array(z.string()).optional(),
  }),
});

export const updatePostSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Post ID is required'),
  }),
  body: z.object({
    caption: z.string().max(2200, 'Caption cannot exceed 2200 characters').optional(),
    tags: z.union([z.array(z.string()), z.string()]).optional(),
    location: z.string().max(100, 'Location too long').optional(),
  }),
});
