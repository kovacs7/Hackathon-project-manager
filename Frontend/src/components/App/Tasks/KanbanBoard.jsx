import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import io from "socket.io-client";
import axios from "axios";
import PropTypes from "prop-types";
import { Trash2, CalendarClock, FileClock, NotepadText, FolderGit2, SquareCheckBig, GitCompare, CheckCheck, SearchCode, AlarmClockOff } from "lucide-react";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    // Join the project room
    socket.emit("joinProject", projectId);

    const fetchTasksAndUsers = async () => {
      try {
        const [tasksResponse, usersResponse] = await Promise.all([
          axios.get(`/tasks/${projectId}`),
          axios.get("/users"), // Fetch all users, or adjust endpoint as needed
        ]);
        setTasks(tasksResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTasksAndUsers();

    const handleTaskUpdated = (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    };

    const handleTaskCreated = (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleTaskDeleted = (deletedTaskId) => {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== deletedTaskId)
      );
    };

    socket.on("taskUpdated", handleTaskUpdated);
    socket.on("taskCreated", handleTaskCreated);
    socket.on("taskDeleted", handleTaskDeleted);

    return () => {
      socket.off("taskUpdated", handleTaskUpdated);
      socket.off("taskCreated", handleTaskCreated);
      socket.off("taskDeleted", handleTaskDeleted);
    };
  }, [projectId]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskToUpdate = tasks.find((task) => task._id === draggableId);

    if (!taskToUpdate) return;

    // Optimistically update the task status locally
    const updatedTasks = tasks.map((task) =>
      task._id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );
    setTasks(updatedTasks);

    try {
      const response = await axios.put(`/tasks/${taskToUpdate._id}`, {
        status: destination.droppableId,
      });
      socket.emit("updateTask", projectId, response.data);
    } catch (error) {
      console.error("Error updating task:", error);
      // Revert the optimistic update if the API call fails
      setTasks(tasks);
    }
  };

  const getUsername = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.username : "Unknown user";
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      socket.emit("deleteTask", projectId, taskId);
      setIsModalOpen(false);
      // Remove the task locally after deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 p-4">
          {["planned", "ongoing", "completed", "backlog"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 p-4 bg-gray-50 rounded-lg shadow-md border border-indigo-300 overflow-y-auto`}
                  style={{ maxHeight: "90vh" }} // Set the maximum height for columns
                >
                  <h2
                    className={`text-lg font-semibold tracking-tighter mb-4 uppercase text-center rounded-md flex flex-wrap gap-2 items-center justify-center py-1 ${
                      status === "backlog"
                        ? "bg-indigo-100 text-indigo-700 border border-indigo-700"
                        : status === "completed"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-700"
                        : status === "ongoing"
                        ? "bg-blue-100 text-blue-700 border border-blue-700"
                        : status === "planned"
                        ? "bg-purple-100 text-purple-700 border border-purple-700"
                        : ""
                    }`}
                  >
                    <p>
                      {status === "backlog" ? (
                        <>
                          <FileClock size={22} />
                        </>
                      ) : status === "completed" ? (
                        <>
                          <SquareCheckBig size={22} />
                        </>
                      ) : status === "ongoing" ? (
                        <>
                          <FolderGit2 size={22} />
                        </>
                      ) : status === "planned" ? (
                        <>
                          <NotepadText size={22} />
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                    <p>{status}</p>
                  </h2>
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={`mb-1 p-4 bg-white rounded-lg shadow-md text-wrap`}
                          >
                            <div className="flex flex-wrap justify-between items-center relative">
                              <h3 className="font-bold text-clip text-md break-words">
                                {task.title}
                              </h3>
                              <button
                                className="whitespace-nowrap rounded-md bg-red-100 px-0.5 py-0.5 text-sm text-orange-700 flex flex-wrap gap-1 items-center absolute -top-2 -right-2"
                                onClick={() => {
                                  setSelectedTaskId(task._id);
                                  setIsModalOpen(true);
                                }}
                              >
                                <Trash2 size={16} />
                              </button>
                              <div className="absolute -top-6 -left-6">
                                {status === "backlog" ? (
                                  <div className="bg-indigo-100 rounded-full p-1 border border-indigo-700">
                                    <AlarmClockOff color="indigo" size={16} />
                                  </div>
                                ) : status === "completed" ? (
                                  <div className="bg-emerald-100 rounded-full p-1 border border-emerald-700">
                                    <CheckCheck color="green" size={16} />
                                  </div>
                                ) : status === "ongoing" ? (
                                  <div className="bg-blue-100 rounded-full p-1 border border-blue-700">
                                    <GitCompare color="blue" size={16} />
                                  </div>
                                ) : status === "planned" ? (
                                  <div className="bg-purple-100 rounded-full p-1 border border-purple-700">
                                    <SearchCode color="purple" size={16} />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <p className="mb-4 text-clip text-sm break-words">
                              {task.description}
                            </p>
                            <div className="flex flex-wrap justify-between">
                              <div className="flex flex-wrap gap-1 text-sm">
                                <p className="font-semibold text-sm">
                                  Due date:
                                </p>{" "}
                                <p className="inline-flex items-center justify-center rounded-lg bg-emerald-100 px-1.5 py-0.5 text-emerald-700 gap-1">
                                  <CalendarClock size={16} />
                                  <p className="text-xs">
                                    {task.dueDate.slice(0, 10)}
                                  </p>
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1 text-sm mt-2 items-center">
                                <p className="font-semibold text-sm">
                                  Assigned to:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {task.assignedTo.map((userId) => (
                                    <span
                                      className="whitespace-nowrap rounded-md bg-purple-100 px-1.5 py-0.5 text-xs text-purple-700"
                                      key={userId}
                                    >
                                      {getUsername(userId)}{" "}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Delete confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex justify-center items-center">
          <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 text-gray-700">
            <p className="text-xl font-medium leading-tight tracking-wide text-center">
              Are you certain you want to delete this task?
            </p>
            <p className="flex-1 text-gray-600">
              This task will be{" "}
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
                onClick={() => {
                  handleDeleteTask(selectedTaskId);
                }}
                className="px-4 py-2 rounded-lg shadow-sm bg-indigo-500 text-gray-50 flex flex-wrap gap-3 items-center"
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

export default KanbanBoard;

KanbanBoard.propTypes = {
  projectId: PropTypes.string.isRequired,
};
