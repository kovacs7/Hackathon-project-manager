const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  senderUsername: { type: String },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("chat", chatSchema);
