const express = require("express");
const router = express.Router();
const {
  
} = require("../controllers/taskController");

router.get("/tasks", getTasks);

router.post("/tasks", createTasks);

router.put("/tasks/:id", updateTasks);

router.delete("/tasks/:id", deleteTasks);

module.exports = router;
