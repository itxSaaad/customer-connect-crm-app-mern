import express from 'express';

import {
  addInteractionToCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from '../controllers/customerControllers.js';

import { protect, authorizeRoles } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllCustomers)
  .post(protect, authorizeRoles('admin', 'manager'), createCustomer);

router
  .route('/:id')
  .get(protect, getCustomerById)
  .put(protect, authorizeRoles('admin', 'manager'), updateCustomer)
  .delete(protect, authorizeRoles('admin'), deleteCustomer);

router
  .route('/:id/interactions')
  .post(
    protect,
    authorizeRoles('admin', 'sales-rep'),
    addInteractionToCustomer
  );

export default router;
