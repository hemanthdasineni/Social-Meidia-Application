import { Router } from 'express';
import {
  getPostComments,
  createComment,
  deleteComment,
} from '../controllers/comment.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { createCommentSchema } from '../validators/comment.validator.js';

const router = Router();

router.get('/:postId', getPostComments);
router.post('/:postId', verifyJWT, validate(createCommentSchema), createComment);
router.delete('/:commentId', verifyJWT, deleteComment);

export default router;
