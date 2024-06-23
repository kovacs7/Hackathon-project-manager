const express = require("express");
const router = express.Router();
const {getProject} = require("../controllers/projectController");

router.post("/project", getProject);

module.exports = router;
