const {
  userModel,
  chatModel,
  canvasModel,
  projectModel,
  taskModel,
} = require("../models/models.js");

const mongoose = require("mongoose");

const createProjects = async (req, res) => {
  const { title, description, createdBy, teamMembers, tags } = req.body;

  try {
    // Find users by usernames
    const users = await userModel
      .find({ username: { $in: teamMembers } })
      .select("_id");

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ error: "Invalid ObjectId for createdBy." });
    }

    // Check if all provided usernames are valid
    if (users.length !== teamMembers.length) {
      return res
        .status(400)
        .json({ message: "One or more usernames are invalid" });
    }

    // Extract ObjectId from the users
    const teamMemberIds = users.map((user) => user._id);

    // Create new project
    const newProject = new projectModel({
      title,
      description,
      createdBy,
      info: { tags },
      teamMembers: teamMemberIds,
    });

    // Save project
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProjects };
