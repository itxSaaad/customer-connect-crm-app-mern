import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Meeting', 'Call', 'Email'],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: { type: String },
  description: { type: String },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
});

const Interaction = mongoose.model('Interaction', interactionSchema);

export default Interaction;
