const { Schema, model } = require('mongoose');

// This auto-generates _id, right?
const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  }
});

const Campaign = model('Campaign', campaignSchema);

module.export = Campaign;
