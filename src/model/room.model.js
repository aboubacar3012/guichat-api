const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["public", "private"],
    default: "public",
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  roomMembers: [{
    username: {
      type: String,
      required: true,
    },
  }],
  roomMessages: [{
    message: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  }],

  createdAt: {
    default: Date.now,
    type: Date,
    required: true,
  },
  updatedAt: {
    default: Date.now,
    type: Date,
    required: true,
  },
});

roomSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("rooms", roomSchema);
