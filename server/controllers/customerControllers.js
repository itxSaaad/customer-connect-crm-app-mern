import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import Customer from '../models/customerModel.js';

const createCustomer = asyncHandler(async (req, res) => {
  const { name, contactInfo, company, address, industry, notes } = req.body;

  if (!name) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Customer name is required');
  } else {
    const customer = await Customer.create({
      name,
      contactInfo,
      company,
      address,
      industry,
      notes,
    });

    if (customer) {
      res.status(StatusCodes.CREATED).json({
        _id: customer.id,
        name: customer.name,
        contactInfo: customer.contactInfo,
        company: customer.company,
        address: customer.address,
        industry: customer.industry,
        notes: customer.notes,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Invalid customer data');
    }
  }
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({}).populate('interactions');

  if (customers) {
    res.status(StatusCodes.OK).json(customers);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('No customers found');
  }
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id).populate(
    'interactions'
  );

  if (customer) {
    res.status(StatusCodes.OK).json(customer);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Customer not found');
  }
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { name, contactInfo, company, address, industry, notes } = req.body;

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name,
      contactInfo,
      company,
      address,
      industry,
      notes,
    },
    { new: true }
  );

  if (customer) {
    res.status(StatusCodes.OK).json({
      _id: customer.id,
      name: customer.name,
      contactInfo: customer.contactInfo,
      company: customer.company,
      address: customer.address,
      industry: customer.industry,
      notes: customer.notes,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Customer not found');
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    await customer.remove();
    return res.status(StatusCodes.OK).json({ message: 'Customer removed' });
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Customer not found');
  }
});

export {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};
