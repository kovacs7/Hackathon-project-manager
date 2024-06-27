import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { SquarePlus, LayoutList, X } from "lucide-react";
import Logo2 from "../../../assets/Logo2.svg";
import TaskBadge from "./TaskBadge"

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const Task = () => {
  const [projectInfo, setProjectInfo] = useState({});
  const [usernames, setUsernames] = useState([]);
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("planned");
  const [assignedTo, setAssignedTo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDataByProjectId = async () => {
    try {
      const res = await axios.get(`/app-dashboard/${projectId}/tasks`);
      const teamMemberUsernames = await axios.post("/fetch-usernames", {
        objectIds: res.data.teamMembers,
      });
      setUsernames(teamMemberUsernames.data.usernames);
      setProjectInfo(res.data);

      if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Error occured while fetching data by projectId on client.");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      dueDate,
      status,
      assignedTo: selectedUsernames.map((user) => user._id),
      projectId,
    };

    socket.emit("createTask", taskData, (response) => {
      if (response.status === "ok") {
        toast.success("Task created successfully!");
        setTitle("")
        setAssignedTo("")
        setDescription("")
        setDueDate("")
        setStatus("planned")
        setSelectedUsernames([])
        setIsModalOpen(false)
      } else {
        toast.error("Error creating task");
      }
    });
  };

  const handleAssignedToChange = (e) => {
    const value = e.target.value;
    setAssignedTo(value);

    if (value) {
      const filteredSuggestions = usernames.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  const handleAddUsername = (userId) => {
    const user = usernames.find((user) => user._id === userId);
    if (
      user &&
      !selectedUsernames.some((selected) => selected._id === user._id)
    ) {
      setSelectedUsernames([...selectedUsernames, user]);
      setAssignedTo(""); // Clear input after selection
      setSuggestions([]); // Clear suggestions after selection
    }
  };

  const handleRemoveUsername = (userId) => {
    const updatedUsernames = selectedUsernames.filter(
      (user) => user._id !== userId
    );
    setSelectedUsernames(updatedUsernames);
  };

  useEffect(() => {
    fetchDataByProjectId();
  }, []);

  return (
    <>
      <h2 className="text-md font-bold font-headerFonts sm:text-xl p-2 text-gray-600 border-b-2 border-gray-300 flex justify-between items-center bg-white">
        <p className="flex items-center gap-2">
          <LayoutList />
          Task Management For {projectInfo.title}
        </p>
        <button
          className="group relative inline-block text-sm font-medium text-white focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
          <span className="block border border-indigo-600 bg-indigo-500 px-1 py-1 transition-transform active:border-indigo-400 active:bg-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
            <div className="flex items-center gap-2">
              <SquarePlus />
              <p className="sm:block hidden pr-1">Create Task</p>
            </div>
          </span>
        </button>
      </h2>

      {/* KanBan Application */}
      

      {/* Form Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="relative flex flex-col items-center max-w-2xl gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-50 text-gray-800 mx-4">
            <button
              className="absolute top-2 right-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={32} />
            </button>
            <h2 className="sm:text-2xl text-xl font-bold leading-tight tracking-wide text-gray-600 flex items-center gap-2">
              <img src={Logo2} className="h-[40px] w-[40px]" />
              <p>Aspire.</p>
            </h2>
            <p className="flex-1 text-md text-left dark:text-gray-600">
              Please enter the following information to create a new task.
            </p>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Task Name:
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
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="planned">planned</option>
                  <option value="ongoing">ongoing</option>
                  <option value="completed">completed</option>
                  <option value="backlog">backlog</option>
                </select>
              </div>

              <div className="col-span-6 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Assigned To (username of your team member):
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  value={assignedTo}
                  onChange={handleAssignedToChange}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute border border-gray-400 rounded-md mt-1 bg-white shadow-sm max-h-40 overflow-auto w-1/2 z-10">
                    {suggestions.map((user) => (
                      <li
                        key={user._id}
                        className="px-4 py-2 cursor-pointer border-b hover:bg-gray-200"
                        onClick={() => handleAddUsername(user._id)}
                      >
                        {user.username}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="col-span-6">
                <div className="mt-1 flex flex-wrap">
                  {selectedUsernames.map((user) => (
                    <TaskBadge
                      key={user._id}
                      fn={handleRemoveUsername}
                      user={user}
                    />
                  ))}
                </div>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating a task, you agree to our
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
                      <SquarePlus size={16} />
                      <p className="pr-1">Create Task</p>
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

export default Task;
