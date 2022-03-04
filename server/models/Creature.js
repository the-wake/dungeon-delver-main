const { Schema, model } = require('mongoose');

// This auto-generates _id, right?
const creatureSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

const Creature = model('Creature', creatureSchema);

module.exports = Creature;
