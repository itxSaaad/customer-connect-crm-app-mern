import express from 'express';

import {
  getAllOpportunities,
  createOpportunity,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} from '../controllers/opportunityControllers.js';

import { protect, authorizeRoles } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllOpportunities)
  .post(protect, createOpportunity);

router
  .route('/:id')
  .get(protect, getOpportunityById)
  .put(protect, updateOpportunity)
  .delete(protect, authorizeRoles('manager', 'admin'), deleteOpportunity);

export default router;
