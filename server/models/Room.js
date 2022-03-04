const { Schema, model } = require('mongoose');

// This auto-generates _id, right?
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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

const Room = model('Room', roomSchema);

module.exports = Room;
