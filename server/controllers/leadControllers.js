import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

import Lead from '../models/leadModel.js';
import User from '../models/userModel.js';
import Opportunity from '../models/opportunityModel.js';

const getLeads = asyncHandler(async (req, res) => {
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

const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error('Lead not found');
  } else {
    await Opportunity.deleteMany({
      _id: { $in: lead._id },
    });

    await lead.deleteOne();
    res.status(StatusCodes.OK).json({ message: 'Lead removed' });
  }
});

export { getLeads, createLead, getLeadById, updateLead, deleteLead };
