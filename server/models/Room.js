const { Schema, model } = require('mongoose');
const Area = require('./Area.js');


const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  blurb: {
    type: String,
  },
  creatures: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Creature',
    }
  ],
  notes: {
    type: String,
  },
  area: {
    type: Schema.Types.ObjectId,
    ref: 'Area',
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
  Area.findOneAndUpdate(
    { _id: this.area },
    { $addToSet: { rooms: this._id } },
    { new: true },
  ).exec();
  next();
});

roomSchema.pre('remove', function (next) {
  Area.findOneAndUpdate(
    { _id: this.area },
    { $pull: { rooms: this._id } },
    { new: true },
  ).exec();
  next();
});

const Room = model('Room', roomSchema);

module.exports = Room;
