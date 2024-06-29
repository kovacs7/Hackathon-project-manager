import axios from "axios";
import { MessageCircleCode } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import useAccountData from "../../../store/authStore";

const Chat = () => {
  const [projectInfo, setProjectInfo] = useState({});
  const { projectId } = useParams();
  const { data, getAccountData } = useAccountData();

  useEffect(() => {
    getAccountData();
  }, [getAccountData]);

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
    <div>
      <h2 className="text-md font-bold font-headerFonts sm:text-xl p-2 text-gray-600 border-b-2 border-gray-300 flex justify-between items-center bg-white">
        <p className="flex items-center gap-2">
          <MessageCircleCode />
          Chats Room For {projectInfo.title}
        </p>
      </h2>
      <div>
        <ChatRoom projectId={projectId} userId={data._id} username={data.username}/>
      </div>
    </div>
  );
};

export default Chat;
