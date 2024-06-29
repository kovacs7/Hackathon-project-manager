import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import {
  ArrowUpAZ,
  Calendar,
  Clock,
  MessageSquareMore,
  SendHorizonal,
  UserPlus,
  Users,
} from "lucide-react";

const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const ChatRoom = ({ projectId, userId, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Map());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinProject", projectId, userId, username);

    socket.on("previousMessages", (messages) => {
      setMessages(messages);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", ({ userId, username }) => {
      setTypingUsers((prevUsers) => new Map(prevUsers).set(userId, username));
    });

    socket.on("stopTyping", (userId) => {
      setTypingUsers((prevUsers) => {
        const newUsers = new Map(prevUsers);
        newUsers.delete(userId);
        return newUsers;
      });
    });

    return () => {
      socket.off("previousMessages");
      socket.off("message");
      socket.off("onlineUsers");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const messageData = {
      projectId,
      sender: userId,
      senderUsername: username,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", projectId, userId, username);
    setTimeout(() => {
      socket.emit("stopTyping", projectId, userId);
    }, 3000); // timing of user inactivity
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      dateFormat: date.toLocaleDateString(),
      timeFormat: date.toLocaleTimeString(),
    };
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  return (
    <div className="flex flex-wrap p-4 md:space-x-4 h-[90%]">
      {/* Online & typing users section */}
      <div className="bg-white shadow-md rounded-md p-4 w-[18%] md:block hidden">
        <div className="mb-4 border-b border-slate-300 pb-4 h-1/2">
          <div className="font-semibold text-sm flex flex-row gap-1 items-center justify-center p-1 bg-emerald-100 border border-emerald-300 rounded-md text-emerald-800">
            <Users size={16} />
            <p>Online Users</p>
          </div>
          <div className="overflow-y-auto">
            <ul>
              {onlineUsers.map((user, index) => (
                <li
                  key={index}
                  className="font-medium text-sm flex flex-row gap-1 items-center justify-center w-full odd:bg-blue-100 even:bg-slate-100 p-1 my-1 rounded-md text-gray-600"
                >
                  <UserPlus size={16} />
                  <p>{user.username}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm flex flex-row gap-1 items-center justify-center p-1 bg-blue-100 border border-blue-300 rounded-md text-blue-700">
            <ArrowUpAZ size={16} />
            <p>Typing Users ...</p>
          </h3>
          <ul>
            {Array.from(typingUsers.values()).map((username, index) => (
              <li
                key={index}
                className="font-medium text-sm flex flex-row gap-1 items-center justify-center w-full odd:bg-purple-100 even:bg-slate-100 p-1 my-1 rounded-md text-gray-600"
              >
                <MessageSquareMore size={16} />
                <p>{username}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message section */}
      <div className="bg-indigo-100 rounded-md p-4 md:w-[79%] w-full flex flex-col gap-4 max-h-custom shadow-md">
        <div className="overflow-y-auto h-custom bg-white shadow-md rounded-md px-4">
          <div className="messages pt-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className="mb-2 odd:bg-indigo-100 even:bg-slate-100 py-1.5 px-2.5 rounded-md"
              >
                <div className="text-md mb-1">
                  <strong className="text-gray-700">
                    {capitalizeFirstLetter(message.senderUsername)}
                  </strong>
                  : {message.message}
                </div>

                {/* timestamp */}

                <div className="text-xs text-gray-700 flex flex-row gap-4 items-center">
                  <div className="flex flex-row gap-1 items-center">
                    <Calendar size={13} color="green" />
                    <p>{formatTimestamp(message.timestamp).dateFormat}</p>
                  </div>

                  <div className="flex flex-row gap-1 items-center">
                    <Clock size={13} color="green" />
                    <p>{formatTimestamp(message.timestamp).timeFormat}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form
          className="flex flex-row bg-white rounded-md p-1.5 shadow-md"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="px-2.5 py-1.5 rounded-md w-full outline-none border border-indigo-300"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="text-white bg-indigo-500 px-2.5 py-1.5 ml-4 rounded-md flex flex-row gap-1 items-center"
          >
            <p>Send</p>
            <SendHorizonal size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;

ChatRoom.propTypes = {
  projectId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
