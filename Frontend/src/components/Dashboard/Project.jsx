import { useEffect, useState } from "react";
import axios from "axios";
import useAccountData from "../../store/authStore";
import Article from "./Article";
import { SquarePlus, FolderOpenDot } from "lucide-react";
import FormModal from "./FormModal";
import toast from "react-hot-toast";

const Project = () => {
  const { data, getAccountData } = useAccountData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectInfo, setProjectInfo] = useState([]);

  const getUserProjects = async () => {
    try {
      const res = await axios.post("/getprojects", {user : data._id}); 
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setProjectInfo(res.data);
        console.log(res.data)
      }
    } catch (error) {
      toast.error("Error occurred while fetching data of user's projects.");
      console.log(error);
    }
  };

 useEffect(() => {
   if (data._id) {
     getUserProjects();
   }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [data._id]);

  useEffect(() => {
    getAccountData();
  }, [getAccountData]);

  return (
    <>
      <section className="text-gray-800">
        <div className="container max-w-7xl p-6 mx-auto space-y-6 sm:space-y-8">
          <h2 className="text-lg font-bold font-headerFonts sm:text-xl p-2 text-gray-600 border-b-2 border-gray-800 flex justify-between items-center">
            <p className="flex items-center gap-2">
              <FolderOpenDot />
              Projects Dashboard
            </p>
            <button
              className="group relative inline-block text-sm font-medium text-white focus:outline-none"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
              <span className="block border border-indigo-600 bg-indigo-500 px-2 py-1 transition-transform active:border-indigo-400 active:bg-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
                <div className="flex items-center gap-2">
                  <SquarePlus />
                  Create Project
                </div>
              </span>
            </button>
          </h2>
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectInfo.map((project) => (
              <Article key={project._id} project={project} />
            ))}
          </div>
        </div>
      </section>
      {isModalOpen && <FormModal modalClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Project;
