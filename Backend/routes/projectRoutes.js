const express = require("express");
const router = express.Router();
const {createProjects} = require("../controllers/projectController");

router.post("/projects", createProjects);

module.exports = router;
