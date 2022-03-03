const { Schema, model } = require('mongoose');

// This auto-generates _id, right?
const dungeonSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  }
});

const Dungeon = model('dungeon', dungeonSchema);

module.export = Dungeon;
