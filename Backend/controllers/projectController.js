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
    const users = await userModel
      .find({ username: { $in: teamMembers } })
      .select("_id");

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ error: "Invalid ObjectId for createdBy." });
    }

    if (users.length !== teamMembers.length) {
      return res
        .status(400)
        .json({ message: "One or more usernames are invalid" });
    }

    // Extract ObjectId from the users
    const teamMemberIds = users.map((user) => user._id);

    const newProject = new projectModel({
      title,
      description,
      createdBy,
      info: { tags },
      teamMembers: teamMemberIds,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const userId = req.body.user;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const projects = await projectModel
      .find({
        $or: [{ createdBy: userId }, { teamMembers: userId }],
      })
      .populate("createdBy", "username")
      .populate("teamMembers", "username");

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const projectData = await projectModel.findById(projectId);
    res.json(projectData);
  } catch (error) {
    console.log("Error :: getProjectById", error);
    res.json({
      error: "Error occured while fetching data by projectId on server.",
    });
  }
};

module.exports = { createProjects, getUserProjects, getProjectById };
