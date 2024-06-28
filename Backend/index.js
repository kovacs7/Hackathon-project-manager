const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const {createTask} = require('./handlers/taskHandler');
const { taskModel } = require("./models/models");

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

//DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((Error) => {
    console.log("Error in Connecting to the Server", Error);
  });

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
);

io.on("connection", (socket) => {
  console.log("client connected");

  // Join the project room
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`Client joined project ${projectId}`);
  });

  // Task operations
  socket.on("createTask", (taskData, callback) => {
    const { projectId } = taskData; // Extract projectId from taskData
    createTask(io, projectId, taskData, callback); // Pass io to createTask
  });

  socket.on("updateTask", (projectId, task) => {
    io.to(projectId).emit("taskUpdated", task);
  });

  socket.on("deleteTask", (projectId, taskId) => {
    io.to(projectId).emit("taskDeleted", taskId);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

app.use("/" , require("./routes/authRoutes"))
app.use("/" , require("./routes/projectRoutes"))
app.use("/", require("./routes/taskRoutes"))

server.listen(PORT, () => {
  console.log(`server is runnung On ${PORT}`);
});

module.exports = io