const { Schema, model } = require('mongoose');

// This auto-generates _id, right?
const campaignSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  dungeons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dungeon',
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
},
  {
    toJSON: {
      virtuals: true,
    }
  }
);

// We could also add a pre-delete middleware, but I don't think we want to add a delete campaign route since that could really mess up someone's whole day.

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
