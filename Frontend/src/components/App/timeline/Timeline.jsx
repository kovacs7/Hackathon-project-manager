import axios from "axios";
import { BookCheck, Hourglass, PencilRuler } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ReadOnly from "./ReadOnly";
import EditOnly from "./EditOnly";

const Timeline = () => {
  const [projectInfo, setProjectInfo] = useState({});
  const { projectId } = useParams();
  const [isReadModeOpen, setIsReadModeOpen] = useState(true);

  const fetchDataByProjectId = async () => {
    try {
      const res = await axios.get(`/app-dashboard/${projectId}/tasks`);
      setProjectInfo(res.data);
      if (res.data.error) {
        toast.error(res.data.error);
      }
    } catch (error) {
      toast.error("Error occured while fetching data by projectId on client.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataByProjectId();
  }, []);

  return (
    <>
      <h2 className="text-md font-bold font-headerFonts sm:text-xl p-2 text-gray-600 border-b-2 border-gray-300 flex flex-wrap justify-between items-center bg-white">
        <p className="flex items-center gap-2 mb-2 sm:mb-0">
          <Hourglass />
          Timeline For {projectInfo.title}
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            className="group relative inline-block text-sm font-medium text-white focus:outline-none"
            onClick={() => setIsReadModeOpen(false)}
          >
            <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
            <span className="block border border-indigo-600 bg-indigo-500 px-1 py-1 transition-transform active:border-indigo-400 active:bg-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
              <div className="flex items-center gap-2">
                <PencilRuler size={18} />
                <p className="sm:block hidden pr-1">Edit mode</p>
              </div>
            </span>
          </button>
          <button
            className="group relative inline-block text-sm font-medium text-white focus:outline-none"
            onClick={() => setIsReadModeOpen(true)}
          >
            <span className="absolute inset-0 border-2 border-indigo-500 group-active:border-indigo-600 rounded-lg"></span>
            <span className="block border border-indigo-600 bg-indigo-500 px-1 py-1 transition-transform active:border-indigo-400 active:bg-indigo-400 group-hover:-translate-x-1 group-hover:-translate-y-1 rounded-lg">
              <div className="flex items-center gap-2">
                <BookCheck size={18} />
                <p className="sm:block hidden pr-1">Read mode</p>
              </div>
            </span>
          </button>
        </div>
      </h2>

      {/* timeline section  */}
      <div>
        {isReadModeOpen ? (
          <ReadOnly projectId={projectId} />
        ) : (
          <EditOnly projectId={projectId} />
        )}
      </div>
    </>
  );
};

export default Timeline;
