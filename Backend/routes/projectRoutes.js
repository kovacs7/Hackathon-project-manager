const express = require("express");
const router = express.Router();
const {
  createProjects,
  getUserProjects,
} = require("../controllers/projectController");

router.post("/projects", createProjects);

router.post("/getprojects", getUserProjects);

module.exports = router;
