import { Router } from 'express';

import { protect } from '../middlewares/authMiddlewares.js';

import {
  loginUser,
  registerUser,
  getUserProfile,
} from '../controllers/userControllers.js';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);

export default router;
