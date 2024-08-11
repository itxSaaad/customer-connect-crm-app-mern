import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  stage: {
    type: String,
    enum: ['Qualification', 'Proposal', 'Negotiation', 'Closed'],
    default: 'Qualification',
  },
  expectedCloseDate: { type: Date },
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true,
  },
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;
