const {taskModel} = require('../models/models')

const creatTask = async (taskData, callback) => {
  try {
    const task = new taskModel(taskData);
    await task.save();
    console.log("task created")
    callback({ status: "ok" });
  } catch (error) {
    console.error("Error creating task:", error);
    callback({ status: "error" });
  }
};

module.exports = {creatTask}

