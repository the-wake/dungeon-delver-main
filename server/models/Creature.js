const { Schema, model } = require('mongoose');
const Room = require('./Room.js');

// This auto-generates _id, right?
const creatureSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
  },
  hp: {
    type: Number,
  },
  loot: {
    type: String,
  },
  key_npc: {
    type: Boolean,
    default: false,
  },
  is_alive: {
    type: Boolean,
    default: true,
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

creatureSchema.pre('save', function (next) {
  Room.findOneAndUpdate(
    { _id: this.room },
    { $addToSet: { creatures: this._id } },
    { new: true },
  ).exec();
  next();
});

creatureSchema.pre('remove', function (next) {
  Room.findOneAndUpdate(
    { _id: this.room },
    { $pull: { creatures: this._id } },
    { new: true },
  ).exec();
  next();
});

const Creature = model('Creature', creatureSchema);

module.exports = Creature;
