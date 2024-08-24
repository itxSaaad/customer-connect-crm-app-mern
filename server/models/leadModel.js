import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: String,
    phone: String,
  },
  source: { type: String },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Won'],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
