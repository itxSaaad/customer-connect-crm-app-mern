import express from 'express';

import {
  createLead,
  deleteLead,
  getLeadById,
  getAllLeads,
  updateLead,
} from '../controllers/leadControllers.js';

import { authorizeRoles, protect } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllLeads)
  .post(protect, authorizeRoles('admin', 'sales-rep'), createLead);

router
  .route('/:id')
  .get(protect, getLeadById)
  .put(protect, authorizeRoles('admin', 'sales-rep'), updateLead)
  .delete(protect, authorizeRoles('admin'), deleteLead);

export default router;
