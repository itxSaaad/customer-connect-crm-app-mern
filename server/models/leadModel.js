import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: { type: String },
  source: { type: String },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Converted', 'Lost'],
    default: 'New',
  },
  salesRepresentative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  opportunities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Opportunity',
    },
  ],
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
