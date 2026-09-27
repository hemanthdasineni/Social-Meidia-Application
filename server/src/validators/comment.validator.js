import { z } from 'zod';

export const createCommentSchema = z.object({
  params: z.object({
    postId: z.string().min(1, 'Post ID is required'),
  }),
  body: z.object({
    content: z.string().min(1, 'Comment content cannot be empty').max(1000, 'Comment cannot exceed 1000 characters'),
    parentCommentId: z.string().optional(),
  }),
});
