import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import Interaction from '../models/interactionModel.js';
import Customer from '../models/customerModel.js';

/**
 * @desc Gets all interactions.
 * @route GET /api/v1/interaction
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the interactions are not found.
 */

const getAllInteractions = asyncHandler(async (req, res) => {
  const { type, customer } = req.query;

  const query = {};

  if (type) {
    query.type = type;
  }

  if (customer) {
    query.customer = customer;
  }

  const interactions = await Interaction.find(query).populate('customer');

  if (interactions) {
    res.status(StatusCodes.OK).json(interactions);
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('No interactions found');
  }
});

/**
 * @desc Creates a new interaction.
 * @route POST /api/v1/interaction
 * @access Private OR Admin
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the interaction is not created.
 */

const createInteraction = asyncHandler(async (req, res) => {
  const { type, date, time, description, customerId } = req.body;

  if (!type) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Please add a type');
  } else {
    if (!customerId) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Please add a customer');
    } else {
      const customer = await Customer.findById(customerId);
      if (!customer) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Customer not found');
      } else {
        const interaction = await Interaction.create({
          type,
          date,
          time,
          description,
          customer,
        });

        if (interaction) {
          customer.interactions.push(interaction._id);
          await customer.save();

          res.status(StatusCodes.CREATED).json(interaction);
        } else {
          res.status(StatusCodes.BAD_REQUEST);
          throw new Error('Invalid interaction data');
        }
      }
    }
  }
});

/**
 * @desc Gets an interaction by ID.
 * @route GET /api/v1/interaction/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the interaction is not found.
 */

const getInteractionById = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id).populate(
    'customer'
  );

  if (!interaction) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Interaction not found');
  } else {
    res.status(StatusCodes.OK).json(interaction);
  }
});

/**
 * @desc Updates an interaction.
 * @route PUT /api/v1/interaction/:id
 * @access Private OR Admin
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the interaction is not found.
 */

const updateInteraction = asyncHandler(async (req, res) => {
  const { type, date, time, description } = req.body;

  const interaction = await Interaction.findByIdAndUpdate(
    req.params.id,
    {
      type,
      date,
      time,
      description,
    },
    { new: true }
  ).populate('customer');

  if (!interaction) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Interaction not found');
  } else {
    res.status(StatusCodes.OK).json(interaction);
  }
});

/**
 * @desc Deletes an interaction.
 * @route DELETE /api/v1/interaction/:id
 * @access Admin
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the interaction is not found.
 */

const deleteInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.findById(req.params.id);

  if (!interaction) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Interaction not found');
  } else {
    await interaction.remove();
    res.status(StatusCodes.OK).json({ message: 'Interaction removed' });
  }
});

export {
  getAllInteractions,
  createInteraction,
  getInteractionById,
  updateInteraction,
  deleteInteraction,
};
