const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const { Socket } = require("dgram");

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
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
  console.log("User connected");
  console.log(socket.id)

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Add your custom event handlers here
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("message", data); // Broadcast to all clients
  });
});

app.use("/" , require("./routes/authRoutes"))
app.use("/" , require("./routes/projectRoutes"))

server.listen(PORT, () => {
  console.log(`server is runnung On ${PORT}`);
});
