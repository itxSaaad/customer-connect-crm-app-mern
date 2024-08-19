import express from 'express';

import {
  addInteractionToCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from '../controllers/customerControllers.js';

import { protect } from '../middlewares/authMiddlewares.js';

const router = express.Router();

router.route('/').get(protect, getAllCustomers).post(protect, createCustomer);

router
  .route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

router.route('/:id/interactions').post(protect, addInteractionToCustomer);

export default router;
