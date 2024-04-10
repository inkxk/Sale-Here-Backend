const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = {
  Rooms,
};
