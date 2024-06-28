const { taskModel, projectModel } = require("../models/models");

const createTask = async (io, projectId, taskData, callback) => {
  try {
    // Create a new task instance with projectId included
    const task = new taskModel({ ...taskData, projectId });

    // Save the task to the database
    await task.save();

    // Update the project's tasks array
    const project = await projectModel.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    project.tasks.push(task._id);
    await project.save();

    // Emit the taskCreated event to the project room
    io.to(projectId.toString()).emit("taskCreated", task);

    console.log("Task created");
    callback({ status: "ok", task });
  } catch (error) {
    console.error("Error creating task:", error);
    callback({ status: "error" });
  }
};

module.exports = { createTask };
