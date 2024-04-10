const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomsSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
});

const Rooms = mongoose.model("Rooms", RoomsSchema);

module.exports = {
  Rooms,
};
