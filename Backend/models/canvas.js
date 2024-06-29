const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  canvasData: { type: String, required: true }, 
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("canvas", canvasSchema);
