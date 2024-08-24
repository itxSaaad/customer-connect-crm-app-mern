import { Router } from 'express';

import { protect, authorizeRoles } from '../middlewares/authMiddlewares.js';

import {
  getAllUsers,
  getUserProfile,
  loginUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userControllers.js';

const router = Router();

router.route('/').get(protect, authorizeRoles('admin'), getAllUsers);

router.post('/login', loginUser);

router.post('/register', registerUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id').put(protect, authorizeRoles('admin'), updateUser);

export default router;
