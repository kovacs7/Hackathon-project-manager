const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
});

module.exports = mongoose.model("timeline", timelineSchema);
