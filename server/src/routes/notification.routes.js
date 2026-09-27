import { Router } from 'express';
import {
  getNotifications,
  markNotificationsAsRead,
} from '../controllers/notification.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyJWT, getNotifications);
router.patch('/mark-read', verifyJWT, markNotificationsAsRead);

export default router;
