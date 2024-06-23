const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
  canvas: { type: mongoose.Schema.Types.ObjectId, ref: "Canvas" },
});

module.exports = mongoose.model("project", projectSchema);
