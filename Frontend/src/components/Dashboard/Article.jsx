import {
  LayoutList,
  MessageCircleCode,
  Brush,
  Hourglass,
  Headset,
  Video,
  Users,
  User,
  Trash2,
} from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import toast from 'react-hot-toast'

const Article = ({ project, data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUsersClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDeleteProject = async () => {
    try {
      const res = await axios.delete(`/projects/${project._id}`, {
        data: { userId: data._id },
      });
      if (res.data.error) {
        toast.error(res.data.error)
      } else {
        toast.success(res.data.message);
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error occured while deleting the project.");
      console.error("Error deleting project:", error);
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

  return (
    <>
      <div className="group relative inline-block text-sm font-medium text-indigo-300 focus:outline-none active:text-indigo-700 bg-indigo-400 rounded-md">
        <div className="block transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 rounded-md h-full">
          <div className="flex flex-1 flex-row justify-between h-full">
            <div className="relative overflow-hidden rounded-md border border-indigo-300 bg-white hover:shadow-xl">
              <div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="relative block overflow-hidden p-4 sm:p-6 lg:p-8">
                    {/* trash */}
                    {data._id === project.createdBy._id ? (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="absolute top-1 right-1 p-1 bg-orange-100 rounded-md text-orange-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : null}
                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl line-clamp-2 mb-2">
                          {project.title}
                        </h3>

                        <div className="mt-1 text-xs font-medium text-gray-600 flex flex-wrap flex-row justify-between items-center gap-2">
                          <div className="font-bold flex flex-wrap flex-row gap-1">
                            <p>Created by:</p>
                            <p className="font-medium">
                              {project.createdBy.username}
                            </p>
                          </div>
                          <div className="font-bold flex flex-row gap-1">
                            <p>Date:</p>
                            <p className="font-medium">
                              {formatDate(project.info.date)}
                            </p>
                          </div>
                          <div className="relative ml-3 bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-md">
                            <div
                              onClick={handleUsersClick}
                              className="cursor-pointer flex flex-row gap-1"
                            >
                              <Users size={16} />{" "}
                              <p className="font-medium">Team</p>
                            </div>
                            {showDropdown && (
                              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10 text-gray-600">
                                <ul>
                                  {project.teamMembers.map((member) => (
                                    <li
                                      key={member._id}
                                      className="p-2 hover:bg-blue-50 border-b flex flex-row items-center gap-2"
                                    >
                                      <User size={16} color="indigo" />
                                      <div>{member.username}</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {project.info.tags.map((tag) => (
                        <span
                          key={tag}
                          className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p className="text-pretty text-sm text-gray-500 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      <Link
                        to={`/app-dashboard/${project._id}/tasks`}
                        className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1"
                      >
                        <LayoutList size={16} />
                        Tasks
                      </Link>

                      <Link
                        to={`/app-dashboard/${project._id}/chats`}
                        className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1"
                      >
                        <MessageCircleCode size={16} />
                        Chats
                      </Link>

                      <Link
                        to={`/app-dashboard/${project._id}/canvas`}
                        className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1"
                      >
                        <Brush size={16} />
                        Canvas
                      </Link>

                      <Link
                        to={`/app-dashboard/${project._id}/timeline`}
                        className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1"
                      >
                        <Hourglass size={16} />
                        Timeline
                      </Link>

                      <Link className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <Headset size={16} />
                        Call
                      </Link>

                      <Link className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <Video size={16} />
                        Video call
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal section */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 backdrop-blur-md bg-opacity-25 flex justify-center items-center z-50">
          <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-white text-gray-700 text-center">
            <p className="text-xl font-medium leading-tight tracking-wide text-center">
              Are you certain you want to delete this Project?
            </p>
            <p className="flex-1 text-gray-600">
              This Project will be{" "}
              <span className="text-orange-600">permanently erased</span> from
              the server.
            </p>
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-indigo-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 rounded-lg shadow-sm bg-indigo-500 text-white flex flex-wrap gap-3 items-center"
              >
                <Trash2 size={16} />
                <p>Delete</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Article.propTypes = {
  project: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default Article;
