import express from 'express';

import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from '../controllers/customerControllers.js';

import { authorizeRoles, protect } from '../middlewares/authMiddlewares.js';

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

export default router;
