import { X, FolderOpenDot } from "lucide-react";
import Logo2 from "../../assets/Logo2.svg"
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const FormModal = ({modalClose}) => {
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

            <form className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                  <span className="text-orange-700"> *</span>
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Description"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Description of your project{" "}
                </label>

                <textarea
                  id="Description"
                  name="Description"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                  rows={2}
                ></textarea>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="teamMembers"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Team Members <span className="text-orange-700"> *</span>
                </label>

                <input
                  type="text"
                  id="teamMembers"
                  name="teamMembers"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Tags{" "}
                </label>

                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm px-4 py-2 outline-none"
                />
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
                  className="group relative inline-block text-sm font-medium text-white focus:outline-none"
                  onClick={()=>(toast.success("Project successfully created."))}
                >
                  <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
                  <span className="block border border-indigo-600 bg-indigo-500 px-2 py-1 transition-transform active:border-indigo-400 active:bg-indigo-500 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FolderOpenDot size={16} />{" "}
                      Create Project
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
