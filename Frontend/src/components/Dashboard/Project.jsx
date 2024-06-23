import { useEffect, useState } from "react";
import axios from "axios";
import useAccountData from "../../store/authStore";

const Project = () => {
  const { data, getAccountData } = useAccountData();
  const [isProjectCreated, setIsProjectCreated] = useState(false);

  useEffect(() => {
    getAccountData();
  }, [getAccountData]);

  const createProject = async () => {
    if (data && data._id) {
      try {
        const response = await axios.post("/projects", {
          title: "test-title",
          description: "test-description",
          createdBy: data._id,
        });
        console.log("Project created", response.data);
        setIsProjectCreated(true);
      } catch (error) {
        console.error("Error creating project", error);
      }
    }
  };

  return (
    <div>
      <button onClick={createProject} disabled={isProjectCreated}>
        {isProjectCreated ? "Project Created" : "Create Project"}
      </button>
    </div>
  );
};

export default Project;
