import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Task = () => {
  const [projectInfo , setProjectInfo] = useState({})
  const { projectId } = useParams();

  const fetchDataByProjectId = async () => {
    try {
    const res = await axios.get(`/app-dashboard/${projectId}/tasks`);
    setProjectInfo(res.data)
    if (res.data.error) {
      toast.error(res.data.error)
    }
  } catch (error) {
    toast.error("Error occured while fetching data by projectId on client.");
    console.log(error);
  }}

  useEffect( () => {
    fetchDataByProjectId()
  }, []);

  return (
    <>
      <div className="">Task For {projectInfo.title}</div>
    </>
  );
};

export default Task;
