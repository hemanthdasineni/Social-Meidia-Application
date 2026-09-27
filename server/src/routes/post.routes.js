import { Router } from 'express';
import {
  createPost,
  getFeed,
  getPostById,
  deletePost,
  toggleLike,
  toggleBookmark,
} from '../controllers/post.controller.js';
import { verifyJWT, optionalAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { createPostSchema } from '../validators/post.validator.js';

const router = Router();

router.get('/feed', optionalAuth, getFeed);
router.get('/:id', optionalAuth, getPostById);
router.post('/', verifyJWT, upload.array('images', 5), validate(createPostSchema), createPost);
router.delete('/:id', verifyJWT, deletePost);
router.post('/:id/like', verifyJWT, toggleLike);
router.post('/:id/bookmark', verifyJWT, toggleBookmark);

export default router;
