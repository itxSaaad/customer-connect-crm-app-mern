import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: { type: String },
  company: { type: String },
  address: { type: String },
  industry: { type: String },
  notes: { type: String },
  interactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Interaction',
    },
  ],
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
