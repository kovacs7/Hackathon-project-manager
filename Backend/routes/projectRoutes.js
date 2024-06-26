const express = require("express");
const router = express.Router();
const {
  createProjects,
  getUserProjects,
  getProjectById,
} = require("../controllers/projectController");

router.post("/projects", createProjects);

router.post("/getprojects", getUserProjects);

router.get("/app-dashboard/:projectId/:tools", getProjectById);

module.exports = router;
