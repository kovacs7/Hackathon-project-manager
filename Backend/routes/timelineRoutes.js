const express = require("express");
const router = express.Router();
const { createTimelineEntry, getTimelineEntries, updateTimelineEntry, deleteTimelineEntry} = require("../controllers/timelineController")

router.post("/timeline", createTimelineEntry);
router.get("/timeline/:projectId", getTimelineEntries);
router.put("/timeline/:id", updateTimelineEntry);
router.delete("/timeline/:id", deleteTimelineEntry);

module.exports = router;