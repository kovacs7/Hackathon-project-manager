import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Milestone } from "lucide-react";

const ReadOnly = ({ projectId }) => {
  const [data, setData] = useState([]);
  const [closestMilestoneIndex, setClosestMilestoneIndex] = useState(null);
  const timelineRef = useRef(null);

  const fetchTimeLineData = async () => {
    try {
      const response = await axios.get(`/timeline/${projectId}`);
      setData(response.data);
    } catch (error) {
      console.error("There was an error fetching the timeline entries!", error);
    }
  };

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = dateObj
      .toLocaleDateString("en-US", options)
      .toUpperCase();
    return formattedDate;
  };

  useEffect(() => {
    fetchTimeLineData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const currentDate = new Date().getTime();
      let closestMilestone = null;
      let closestIndex = -1;

      // Find the closest milestone to the current date
      data.forEach((milestone, index) => {
        const milestoneDate = new Date(milestone.date).getTime();
        if (
          !closestMilestone ||
          Math.abs(milestoneDate - currentDate) <
            Math.abs(new Date(closestMilestone.date).getTime() - currentDate)
        ) {
          closestMilestone = milestone;
          closestIndex = index;
        }
      });

      // Update the data to mark the closest milestone as the next goal
      setData((prevData) =>
        prevData.map((milestone) => ({
          ...milestone,
          isNextGoal: milestone === closestMilestone,
        }))
      );

      // Set the closest milestone index
      setClosestMilestoneIndex(closestIndex);
    }
  }, [data]);

  useEffect(() => {
    if (closestMilestoneIndex !== null && timelineRef.current) {
      const closestMilestoneElement =
        timelineRef.current.children[closestMilestoneIndex];
      if (closestMilestoneElement) {
        closestMilestoneElement.scrollIntoView({
          behavior: "smooth",
          block: "center", 
          inline: "center", 
        });
      }
    }
  }, [closestMilestoneIndex]);

  return (
    <>
      <section className="bg-white text-gray-800 max-h-custom h-custom overflow-y-auto m-4">
        <div className="container max-w-5xl px-4 py-12 mx-auto">
          <div className="grid gap-4 mx-4 sm:grid-cols-12">
            <div className="col-span-12 sm:col-span-3">
              <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-indigo-500">
                <h3 className="text-3xl font-bold mb-2 font-headerFonts text-gray-700">
                  Project Timeline
                </h3>
                <span className="text-sm font-bold tracking-wider uppercase text-gray-600 font-headerFonts">
                  <blockquote>
                    &ldquo;Some of us learn from other people{"'"}s mistakes and
                    the rest of us have to be other people. &rdquo;
                    <footer>&mdash; Zig Ziglar</footer>
                  </blockquote>
                </span>
              </div>
            </div>
            {/* timeline section */}
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div
                ref={timelineRef}
                className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300"
              >
                {/* cards */}
                {data.map((milestone) => (
                  <div
                    key={milestone._id}
                    className={`flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-indigo-500 ${
                      milestone.isNextGoal
                        ? "bg-indigo-100 px-4 py-2.5 rounded-md"
                        : ""
                    }`}
                  >
                    <h3 className="text-xl font-semibold tracking-wide">
                      {milestone.title}{" "}
                      {milestone.isNextGoal && (
                        <div className="hidden md:block">
                          <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-full flex flex-row gap-1 items-center w-fit absolute top-2 right-2">
                            <Milestone size={14} />
                            <p>Next Goal</p>
                          </span>
                        </div>
                      )}
                    </h3>
                    <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                      {formatDate(milestone.date)}
                    </time>
                    <p className="mt-3">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReadOnly;

ReadOnly.propTypes = {
  projectId: PropTypes.string.isRequired,
};
