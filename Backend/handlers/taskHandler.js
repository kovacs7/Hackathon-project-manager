const { taskModel, projectModel } = require("../models/models");

const createTask = async (io, projectId, taskData, callback) => {
  try {
    const task = new taskModel({ ...taskData, projectId });

    await task.save();

    const project = await projectModel.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    project.tasks.push(task._id);
    await project.save();

    io.to(projectId.toString()).emit("taskCreated", task);

    console.log("Task created");
    callback({ status: "ok", task });
  } catch (error) {
    console.error("Error creating task:", error);
    callback({ status: "error" });
  }
};

module.exports = { createTask };
