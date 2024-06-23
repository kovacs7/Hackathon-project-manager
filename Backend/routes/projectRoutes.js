const express = require("express");
const router = express.Router();
const {getProjects} = require("../controllers/projectController");

router.post("/projects", getProjects);

module.exports = router;
