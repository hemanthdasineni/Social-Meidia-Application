import { Router } from 'express';
import { searchGlobal, getExploreFeed } from '../controllers/search.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', optionalAuth, searchGlobal);
router.get('/explore', optionalAuth, getExploreFeed);

export default router;
