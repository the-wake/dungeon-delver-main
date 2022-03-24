const { Schema, model } = require('mongoose');
const Campaign = require('./Campaign.js');

// This auto-generates _id, right?
const areaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Dungeon',
      'Town',
      'Wilderness',
    ]
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    }
  ],
  notes: {
    type: String,
  },
  campaign: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// May want to add runValidators: true to the third argument object.
areaSchema.pre('save', function (next) {
  Campaign.findOneAndUpdate(
    { _id: this.campaign },
    { $addToSet: { areas: this._id } },
    { new: true },
  ).exec();
  next();
});

areaSchema.pre('remove', function (next) {
  Campaign.findOneAndUpdate(
    { _id: this.campaign },
    { $pull: { areas: this._id } },
    { new: true },
  ).exec();
  next();
});

const Area = model('Area', areaSchema);

module.exports = Area;
