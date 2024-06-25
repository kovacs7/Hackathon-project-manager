import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import { X, FolderOpenDot } from "lucide-react";
import Logo2 from "../../assets/Logo2.svg";
import useAccountData from "../../store/authStore";
import Badges from "./Badges";
import Tags from "./Tags";

const FormModal = ({ modalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [tags, setTags] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");
  const { data, getAccountData } = useAccountData();

  useEffect(() => {
    getAccountData();
  }, [getAccountData]);

  useEffect(() => {
    if (inputValue) {
      fetchUserSuggestions(inputValue);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const fetchUserSuggestions = async (query) => {
    try {
      const response = await axios.get("http://localhost:3000/users/search", {
        params: { query },
      });
      setUserSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch user suggestions", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setTeamMembers((prev) => [...prev, suggestion]);
    setInputValue("");
    setShowSuggestions(false);
    setUserSuggestions([]);
  };

  const handleRemoveTeamMember = (username) => {
    setTeamMembers((prev) =>
      prev.filter((member) => member.username !== username)
    );
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInputValue.trim() && !tags.includes(tagInputValue.trim())) {
      setTags((prev) => [...prev, tagInputValue.trim()]);
      setTagInputValue("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    const teamMembersUsernames = teamMembers.map((member) => member.username);

    try {
      const response = await axios.post("http://localhost:3000/projects", {
        title,
        description,
        createdBy: data._id,
        teamMembers: teamMembersUsernames,
        tags,
      });

      if (response.status === 201) {
        toast.success("Project successfully created.");
        modalClose();
      }
    } catch (error) {
      toast.error("Failed to create project");
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md flex justify-center items-center">
        <div className="mx-4">
          <div className="relative flex flex-col items-center max-w-2xl gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-gray-50 text-gray-800">
            <button className="absolute top-2 right-2" onClick={modalClose}>
              <X size={32} />
            </button>
            <h2 className="sm:text-3xl text-xl font-bold leading-tight tracking-wide text-gray-700 flex items-center gap-2">
              <img src={Logo2} className="h-[40px] w-[40px]" />
              <p>Aspire.</p>
            </h2>
            <p className="flex-1 text-left dark:text-gray-600">
              Please enter the following information to start a new project.
            </p>

            <form
              className="mt-8 grid grid-cols-6 gap-6"
              onSubmit={handleCreateProject}
            >
              <div className="col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title <span className="text-orange-700"> *</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your project name"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description of your project
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description of your project"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="teamMembers"
                  className="block text-sm font-medium text-gray-700"
                >
                  Team Members <span className="text-orange-700"> *</span>
                </label>
                <input
                  type="text"
                  id="teamMembers"
                  name="teamMembers"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter username to search and click on that username"
                />
                {showSuggestions && userSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-auto w-auto">
                    {userSuggestions.map((user) => (
                      <li
                        key={user._id}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(user)}
                      >
                        {user.username}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="col-span-6 flex flex-wrap gap-2">
                {teamMembers.map((member) => (
                  <Badges
                    key={member.username}
                    username={member.username}
                    onRemove={handleRemoveTeamMember}
                  />
                ))}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tags (Hackathon name or anything that helps you remember.)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                    value={tagInputValue}
                    onChange={(e) => setTagInputValue(e.target.value)}
                    placeholder="Enter a tag and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddTag(e);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="col-span-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tags key={tag} label={tag} onRemove={handleRemoveTag} />
                ))}
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  By creating a project, you agree to our
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
                  <span className="block border border-indigo-600 bg-indigo-500 px-2 py-1 transition-transform active:border-indigo-400 active:bg-indigo-500 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FolderOpenDot size={16} /> Create Project
                    </div>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

FormModal.propTypes = {
  modalClose: PropTypes.func.isRequired,
};

export default FormModal;
