const express = require("express");
const router = express.Router();
const {
  createProjects,
  getUserProjects,
  getProjectById,
  deleteProject,
} = require("../controllers/projectController");

router.post("/projects", createProjects);

router.post("/getprojects", getUserProjects);

router.get("/app-dashboard/:projectId/:tools", getProjectById);

router.delete("/projects/:projectId", deleteProject)

module.exports = router;
