import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Logo2 from "../../../assets/Logo2.svg";
import { X, Trash2, Pencil, SquarePlus } from "lucide-react";

const EditOnly = ({ projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timelineData = {
      title,
      description,
      date,
      projectId,
    };

    try {
      if (isEdit) {
        await axios.put(`/timeline/${editId}`, timelineData);
        toast.success("Milestone Updated Successfully.");
      } else {
        await axios.post("/timeline", timelineData);
        toast.success("Milestone Added to the Timeline.");
      }
      setTitle("");
      setDescription("");
      setDate("");
      setIsEdit(false);
      setEditId(null);
      setIsModalOpen(false);
      fetchTimeLineData();
    } catch (error) {
      console.error(
        "There was an error creating/updating the timeline entry!",
        error
      );
    }
  };

  const fetchTimeLineData = async () => {
    try {
      const response = await axios.get(`/timeline/${projectId}`);
      setData(response.data);
    } catch (error) {
      console.error("There was an error fetching the timeline entries!", error);
    }
  };

  const handleEdit = (milestone) => {
    setTitle(milestone.title);
    setDescription(milestone.description);
    setDate(milestone.date);
    setIsEdit(true);
    setEditId(milestone._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/timeline/${id}`);
      toast.success("Milestone Deleted Successfully.");
      fetchTimeLineData();
    } catch (error) {
      console.error("There was an error deleting the timeline entry!", error);
    }
  };

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);

    // Options for formatting the date
    const options = { day: "numeric", month: "short", year: "numeric" };

    // Format the date using the options
    const formattedDate = dateObj
      .toLocaleDateString("en-US", options)
      .toUpperCase();

    return formattedDate;
  };

  useEffect(() => {
    fetchTimeLineData();
  }, []);


  return (
    <>
      <section className="bg-white text-gray-800 max-h-custom h-custom overflow-y-auto m-4 relative">
        {/* create button */}
        <div className="absolute top-3 right-3">
          <button
            className="group relative inline-block text-sm font-medium text-white focus:outline-none"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
            <span className="block border border-indigo-600 bg-indigo-500 px-1 py-1 transition-transform active:border-indigo-400 active:bg-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
              <div className="flex items-center gap-2">
                <SquarePlus size={18} />
                <p className="sm:block hidden pr-1">Create New Milestone</p>
              </div>
            </span>
          </button>
        </div>

        {/* cards & edit section */}
        <div className="container max-w-5xl px-4 py-12 mx-auto">
          <div className="grid gap-4 mx-4 sm:grid-cols-12">
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-300">
                {data.map((milestone) => (
                  <div
                    key={milestone._id}
                    className="relative flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-600"
                  >
                    <div className="flex flex-row gap-2 absolute top-0 right-0">
                      <button
                        className="whitespace-nowrap rounded-md bg-emerald-100 px-1.5 py-1.5 text-sm text-emerald-700 flex flex-wrap gap-1 items-center"
                        onClick={() => handleEdit(milestone)}
                      >
                        <Pencil size={13} />
                        <p className="sm:block hidden pr-1 text-xs">Edit</p>
                      </button>

                      <button
                        className="whitespace-nowrap rounded-md bg-red-100 px-1.5 py-1.5 text-sm text-orange-700 flex flex-wrap gap-1 items-center"
                        onClick={() => handleDelete(milestone._id)}
                      >
                        <Trash2 size={13} />
                        <p className="sm:block hidden pr-1 text-xs">Delete</p>
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold tracking-wide">
                      {milestone.title}{" "}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="relative flex flex-col items-center max-w-2xl gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-50 text-gray-800 mx-4">
            <button
              className="absolute top-2 right-2"
              onClick={() => {
                setIsModalOpen(false);
                setIsEdit(false);
                setEditId(null);
                setTitle("");
                setDescription("");
                setDate("");
              }}
            >
              <X size={32} />
            </button>
            <h2 className="sm:text-2xl text-xl font-bold leading-tight tracking-wide text-gray-600 flex items-center gap-2">
              <img src={Logo2} className="h-[40px] w-[40px]" />
              <p>Aspire.</p>
            </h2>
            <p className="flex-1 text-md text-left dark:text-gray-600">
              Please enter the following information to{" "}
              {isEdit ? "edit the" : "create a new"} Milestone.
            </p>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Milestone Heading:
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  placeholder="Enter your task name."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  placeholder="Enter description of the task."
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Due Date:
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-1.5 outline-none"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating a timeline, you agree to our
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    terms and conditions{" "}
                  </a>
                  and
                  <a href="#" className="text-gray-700 underline">
                    {" "}
                    privacy policy
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  type="submit"
                  className="group relative inline-block text-sm font-medium text-white focus:outline-none"
                >
                  <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
                  <span className="block border border-indigo-600 bg-indigo-500 px-1 py-1 transition-transform active:border-indigo-400 active:bg-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
                    <div className="flex items-center gap-2">
                      <p className="pr-1">
                        {isEdit ? "Update" : "Create"} Milestone
                      </p>
                    </div>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

EditOnly.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default EditOnly;