const {
  userModel,
  chatModel,
  canvasModel,
  projectModel,
  taskModel,
} = require("../models/models.js");

const getTasks = async (req, res) => {
  try {
    const project = await projectModel
      .findById(req.params.projectId)
      .populate("tasks");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project.tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

const newTasks = async (req, res) => {
  try {
    const newTask = new taskModel(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
 

const updateTasks = async (req, res) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTasks = async (req, res) => {
  try {
    await taskModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getTasks, newTasks, updateTasks, deleteTasks };
