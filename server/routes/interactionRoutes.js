import express from 'express';

import {
  createInteraction,
  deleteInteraction,
  getAllInteractions,
  getInteractionById,
  updateInteraction,
} from '../controllers/interactionControllers.js';

import { authorizeRoles, protect } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllInteractions)
  .post(protect, authorizeRoles('admin', 'sales-rep'), createInteraction);

router
  .route('/:id')
  .get(protect, getInteractionById)
  .put(protect, authorizeRoles('admin', 'sales-rep'), updateInteraction)
  .delete(protect, authorizeRoles('admin'), deleteInteraction);

export default router;
