const { Schema, model } = require('mongoose');
const Dungeon = require('./Dungeon.js');

// This auto-generates _id, right?
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  blurb: {
    type: String,
  },
  dungeon: {
    type: Schema.Types.ObjectId,
    ref: 'Dungeon',
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

roomSchema.pre('save', function (next) {
  Dungeon.findOneAndUpdate(
    { _id: this.dungeon },
    { $addToSet: { rooms: this._id } },
    { new: true },
  ).exec();
  next();
});

const Room = model('Room', roomSchema);

module.exports = Room;
