import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Task = () => {
  const [projectInfo , setProjectInfo] = useState({})
  const [usernames, setUsernames ] = useState([])
  const { projectId } = useParams();

  const fetchDataByProjectId = async () => {
    try {
    const res = await axios.get(`/app-dashboard/${projectId}/tasks`);
    const teamMemberUsernames = await axios.post("/fetch-usernames", {
      objectIds: res.data.teamMembers
    });
    setUsernames(teamMemberUsernames.data.usernames);
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
      <div>{usernames.map((username, i) => { return <p key={i}>username {i} : {username}</p>} )}</div>
    </>
  );
};

export default Task;
