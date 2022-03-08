const { Schema, model } = require('mongoose');
const Campaign = require('./Campaign.js');

// This auto-generates _id, right?
const dungeonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
dungeonSchema.pre('save', function (next) {
  Campaign.findOneAndUpdate(
    { _id: this.campaign },
    { $addToSet: { dungeons: this._id } },
    { new: true },
  ).exec();
  next();
});

dungeonSchema.pre('findOneAndDelete', function (next) {
  Campaign.findOneAndUpdate(
    { _id: this.campaign },
    { $pull: { dungeons: this._id } },
    { new: true },
  ).exec();
  next();
});

const Dungeon = model('Dungeon', dungeonSchema);

module.exports = Dungeon;
