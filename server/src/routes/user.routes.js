import { Router } from 'express';
import {
  getUserProfile,
  updateProfile,
  followUser,
} from '../controllers/user.controller.js';
import { verifyJWT, optionalAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { updateProfileSchema } from '../validators/user.validator.js';

const router = Router();

router.get('/:username', optionalAuth, getUserProfile);
router.patch('/profile', verifyJWT, validate(updateProfileSchema), updateProfile);
router.post('/follow/:targetUserId', verifyJWT, followUser);

export default router;
