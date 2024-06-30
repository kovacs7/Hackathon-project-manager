const timelineModel = require("../models/timeline");

const createTimelineEntry = async (req, res) => {
  try {
    const { title, description, date, projectId } = req.body;

    const newTimelineEntry = new timelineModel({
      title,
      description,
      date,
      projectId,
    });

    await newTimelineEntry.save();
    res.status(201).json(newTimelineEntry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create timeline entry", error });
  }
};

const getTimelineEntries = async (req, res) => {
  try {
    const timelineEntries = await timelineModel
      .find({
        projectId: req.params.projectId,
      })
      .sort({ date: "asc" }); // Sorting by 'date' in ascending order

    res.status(200).json(timelineEntries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve timeline entries", error });
  }
};

const updateTimelineEntry = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const updatedTimeline = await timelineModel.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    );
    res.status(200).json(updatedTimeline);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "There was an error updating the timeline entry.",
        error,
      });
  }
};

const deleteTimelineEntry = async (req, res) => {
  const { id } = req.params;

  try {
    await timelineModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Timeline entry deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "There was an error deleting the timeline entry.",
        error,
      });
  }
};

module.exports = {
  createTimelineEntry,
  getTimelineEntries,
  deleteTimelineEntry,
  updateTimelineEntry,
};
