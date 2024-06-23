const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["planned", "ongoing", "completed"],
    required: true,
  },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

module.exports = mongoose.model("task", taskSchema);
