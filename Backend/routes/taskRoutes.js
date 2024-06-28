const express = require("express");
const router = express.Router();
const { getTasks, newTasks ,updateTasks, deleteTasks } = require("../controllers/taskController");

router.get("/tasks/:projectId", getTasks)

router.post("/tasks", newTasks)

router.put("/tasks/:id", updateTasks);

router.delete("/tasks/:id", deleteTasks)

module.exports = router;
