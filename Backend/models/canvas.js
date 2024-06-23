const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  canvasData: { type: String, required: true }, // Adjust based on your canvas data format
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("canvas", canvasSchema);
