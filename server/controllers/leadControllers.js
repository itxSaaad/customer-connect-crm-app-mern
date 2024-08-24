import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import Lead from '../models/leadModel.js';
import Opportunity from '../models/opportunityModel.js';

/**
 * @desc Gets leads.
 * @route GET /api/v1/leads
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the leads are not found.
 *
 */

const getAllLeads = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.salesRepresentative) {
    query.salesRepresentative = req.query.salesRepresentative;
  }

  if (req.query.opportunities) {
    query.opportunities = req.query.opportunities;
  }

  const leads = await Lead.find(query)
    .populate('salesRepresentative')
    .populate('opportunities');

  if (!leads) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Leads not found');
  } else {
    res.status(StatusCodes.OK).json(leads);
  }
});

/**
 * @desc Creates a lead.
 * @route POST /api/v1/leads
 * @access Private (Sales/Admin)
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the lead is not created.
 *
 */

const createLead = asyncHandler(async (req, res) => {
  const {
    name,
    contactInfo,
    source,
    status,
    salesRepresentative,
    opportunities,
  } = req.body;

  if (!name) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new Error('Lead name is required');
  } else {
    const lead = await Lead.create({
      name,
      contactInfo,
      source,
      status,
      salesRepresentative,
      opportunities,
    });

    if (!lead) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error('Lead not created');
    } else {
      res.status(StatusCodes.CREATED).json(lead);
    }
  }
});

/**
 * @desc Gets a lead by ID.
 * @route GET /api/v1/leads/:id
 * @access Private
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the lead is not found.
 *
 */

const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id)
    .populate('salesRepresentative')
    .populate('opportunities');

  if (!lead) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Lead not found');
  } else {
    res.status(StatusCodes.OK).json(lead);
  }
});

/**
 * @desc Updates a lead.
 * @route PUT /api/v1/leads/:id
 * @access Private (Sales/Admin)
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the lead is not found.
 *
 */

const updateLead = asyncHandler(async (req, res) => {
  const {
    name,
    contactInfo,
    source,
    status,
    salesRepresentative,
    opportunities,
  } = req.body;

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    {
      name,
      contactInfo,
      source,
      status,
      salesRepresentative,
      opportunities,
    },
    { new: true }
  );

  if (!lead) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Lead not found');
  } else {
    res.status(StatusCodes.OK).json(lead);
  }
});

/**
 * @desc Deletes a lead.
 * @route DELETE /api/v1/leads/:id
 * @access Private (Sales/Admin)
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 * @throws {Error} If the lead is not found.
 *
 */

const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Lead not found');
  } else {
    const opportunities = lead.opportunities;

    let opportunity;

    for (let i = 0; i < opportunities.length; i++) {
      opportunity = await Opportunity.findById(opportunities[i]);

      if (!opportunity) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error('Opportunity not found');
      } else {
        await Opportunity.DeleteOne({ _id: opportunities[i] });
      }
    }

    await Lead.DeleteOne({ _id: req.params.id });

    res.status(StatusCodes.OK).json({ message: 'Lead removed' });
  }
});

export { createLead, deleteLead, getAllLeads, getLeadById, updateLead };
