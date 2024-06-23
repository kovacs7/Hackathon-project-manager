const {
  userModel,
  chatModel,
  canvasModel,
  projectModel,
  taskModel,
} = require("../models/models.js");


const mongoose = require("mongoose");

const getProjects = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    if (!title || !createdBy) {
      return res.status(400).json({ error: "Title and createdBy are required fields." });
    }

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ error: "Invalid ObjectId for createdBy." });
    }

    const newProject = new projectModel({
      title,
      description,
      createdBy
    });

    const value = await newProject.save();
    console.log(value);

    res.status(201).json(value);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the project." });
  }
};

module.exports = { getProjects };
