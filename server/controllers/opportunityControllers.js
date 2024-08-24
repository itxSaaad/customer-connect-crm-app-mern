import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import Lead from '../models/leadModel.js';
import Opportunity from '../models/opportunityModel.js';

/**
 * @desc Gets opportunities.
 * @route GET /api/v1/opportunities
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the opportunities are not found.
 */

const getAllOpportunities = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.lead) {
    query.lead = req.query.lead;
  }

  if (req.query.stage) {
    query.stage = req.query.stage;
  }

  const opportunities = await Opportunity.find(query).populate('lead');

  if (!opportunities) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Opportunities not found');
  } else {
    res.status(StatusCodes.OK).json(opportunities);
  }
});

/**
 * @desc Creates an opportunity.
 * @route POST /api/v1/opportunities
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the opportunity is not found.
 */

const createOpportunity = asyncHandler(async (req, res) => {
  const { name, value, stage, expectedCloseDate, lead } = req.body;

  if (!name) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Opportunity name is required');
  } else {
    if (!value) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Opportunity value is required');
    } else {
      if (!lead) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error('Lead is required');
      } else {
        const opportunity = await Opportunity.create({
          name,
          value,
          stage,
          expectedCloseDate,
          lead,
        });

        if (!opportunity) {
          res.status(StatusCodes.BAD_REQUEST);
          throw new Error('Opportunity not created');
        } else {
          res.status(StatusCodes.CREATED).json(opportunity);
        }
      }
    }
  }
});

/**
 * @desc Gets an opportunity by ID.
 * @route GET /api/v1/opportunities/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the opportunity is not found.
 */

const getOpportunityById = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id).populate(
    'lead'
  );

  if (!opportunity) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Opportunity not found');
  } else {
    res.status(StatusCodes.OK).json(opportunity);
  }
});

/**
 * @desc Updates an opportunity by ID.
 * @route PUT /api/v1/opportunities/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the opportunity is not found.
 */

const updateOpportunity = asyncHandler(async (req, res) => {
  const { name, value, stage, expectedCloseDate, lead } = req.body;

  const opportunity = await Opportunity.findByIdAndUpdate(
    req.params.id,
    {
      name,
      value,
      stage,
      expectedCloseDate,
      lead,
    },
    {
      new: true,
    }
  );

  if (!opportunity) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Opportunity not found');
  } else {
    res.status(StatusCodes.OK).json(opportunity);
  }
});

/**
 * @desc Deletes an opportunity by ID.
 * @route DELETE /api/v1/opportunities/:id
 * @access Private (Manager/Admin)
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {NotFoundError} If the opportunity is not found.
 */

const deleteOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Opportunity not found');
  } else {
    const lead = await Lead.findById(opportunity.lead);

    if (!lead) {
      res.status(StatusCodes.NOT_FOUND);
      throw new Error('Lead not found');
    } else {
      await lead.opportunities.pull(opportunity._id);
      await lead.save();

      await opportunity.deleteOne();

      res.status(StatusCodes.OK).json({ message: 'Opportunity removed' });
    }
  }
});

export {
  createOpportunity,
  deleteOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,
};
