import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignUp, Login } from "./pages/index.js";
import Home from "./pages/Home.jsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import AppDashboard from "./components/Layouts/AppDashboard.jsx";
import Task from "./components/App/Tasks/Task.jsx";
import Chat from "./components/App/chat/Chat.jsx";
import Timeline from "./components/App/timeline/Timeline.jsx";
import Canvas from "./components/App/canvas/Canvas.jsx";
import io from "socket.io-client";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to the server");

  // Example of emitting an event
  socket.emit("message", { text: "Hello, server!" });
});

socket.on("message", (data) => {
  console.log("Message from server:", data);
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/app-dashboard" element={<AppDashboard />}>
        <Route path="/app-dashboard/task" element={<Task />} />
        <Route path="/app-dashboard/chat" element={<Chat />} />
        <Route path="/app-dashboard/canvas" element={<Canvas />} />
        <Route path="/app-dashboard/timeline" element={<Timeline />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
);
