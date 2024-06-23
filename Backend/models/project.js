const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "task" }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat" }],
  canvas: { type: mongoose.Schema.Types.ObjectId, ref: "canvas" },
});

module.exports = mongoose.model("project", projectSchema);
