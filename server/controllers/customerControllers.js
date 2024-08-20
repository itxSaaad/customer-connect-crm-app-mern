import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import Customer from '../models/customerModel.js';
import Interaction from '../models/interactionModel.js';

/**
 * Creates a new customer in the database.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Object} The newly created customer object.
 */
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

/**
 * Retrieves all customers from the database, including their interactions.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @return {Object[]} An array of customer objects, each containing their interactions.
 */
const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({}).populate('interactions');

  if (customers) {
    res.status(StatusCodes.OK).json(customers);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('No customers found');
  }
});

/**
 * Retrieves a customer from the database by their ID, including their interactions.
 *
 * @param {Object} req - The HTTP request object containing the customer ID as a parameter.
 * @param {Object} res - The HTTP response object.
 * @return {Object} The customer object with their interactions.
 */
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

/**
 * Updates a customer in the database with the provided information.
 *
 * @param {Object} req - The HTTP request object containing the customer ID as a parameter and the updated customer information in the body.
 * @param {Object} res - The HTTP response object.
 * @return {Object} The updated customer object.
 */
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

/**
 * Deletes a customer from the database by their ID.
 *
 * @param {Object} req - The HTTP request object containing the customer ID as a parameter.
 * @param {Object} res - The HTTP response object.
 * @return {Object} A JSON response with a success message or throws a Error if the customer is not found.
 */
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

/**
 * Adds a new interaction to a customer in the database.
 *
 * @param {Object} req - The HTTP request object containing the customer ID as a parameter and the interaction information in the body.
 * @param {Object} res - The HTTP response object.
 * @return {Object} The newly created interaction object or throws an error if the customer is not found or invalid interaction data is provided.
 */
const addInteractionToCustomer = asyncHandler(async (req, res) => {
  const { type, date, time, description } = req.body;

  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Customer not found');
  } else {
    if (!type) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Interaction type is required');
    } else {
      const interaction = await Interaction.create({
        type,
        date,
        time,
        description,
        customer: customer._id,
      });

      if (interaction) {
        customer.interactions.push(interaction);
        await customer.save();
        res.status(StatusCodes.OK).json(interaction);
      } else {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Invalid interaction data');
      }
    }
  }
});

export {
  addInteractionToCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
};
