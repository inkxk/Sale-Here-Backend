const mongoose = require("mongoose");
const { Schema } = mongoose;

const SenderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const MessagesSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  from: {
    type: SenderSchema,
    required: true,
  },
});

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = {
  Messages,
};
