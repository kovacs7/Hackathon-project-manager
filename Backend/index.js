const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { createTask } = require("./handlers/taskHandler");
const Chat = require("./models/chat");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((Error) => {
    console.log("Error in Connecting to the Server", Error);
  });

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const onlineUsers = {};

const updateOnlineUsers = (projectId) => {
  const users = Object.values(onlineUsers).filter(
    (user) => user.projectId === projectId
  );
  io.to(projectId).emit("onlineUsers", users);
};

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("joinProject", async (projectId, userId, username) => {
    socket.join(projectId);
    console.log(`Client joined project ${projectId}`);

    // online users
    onlineUsers[socket.id] = { userId, username, projectId };
    updateOnlineUsers(projectId);

    // Fetch previous messages
    try {
      const messages = await Chat.find({ projectId }).sort({ timestamp: 1 });
      socket.emit("previousMessages", messages);
    } catch (error) {
      console.error("Error fetching previous messages:", error);
    }
  });

  // Chat operations
  socket.on("sendMessage", async (data) => {
    try {
      const { projectId, sender, senderUsername, message } = data;
      const chat = new Chat({
        projectId,
        sender,
        senderUsername,
        message,
        timestamp: new Date(), 
      });
      await chat.save();
      io.to(projectId).emit("message", chat);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Typing notification
  socket.on("typing", (projectId, userId, username) => {
    socket.to(projectId).emit("typing", { userId, username });
  });

  socket.on("stopTyping", (projectId, userId) => {
    socket.to(projectId).emit("stopTyping", userId);
  });

  // Task operations
  socket.on("createTask", (taskData, callback) => {
    const { projectId } = taskData; 
    createTask(io, projectId, taskData, callback); 
  });

  socket.on("updateTask", (projectId, task) => {
    io.to(projectId).emit("taskUpdated", task);
  });

  socket.on("deleteTask", (projectId, taskId) => {
    io.to(projectId).emit("taskDeleted", taskId);
  });

  socket.on("disconnect", () => {
    const { projectId } = onlineUsers[socket.id] || {};
    delete onlineUsers[socket.id];
    if (projectId) {
      updateOnlineUsers(projectId);
    }
    console.log("client disconnected");
  });
});

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/projectRoutes"));
app.use("/", require("./routes/taskRoutes"));

server.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

module.exports = io;
