import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { SendHorizonal } from "lucide-react";

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
    // Join the project room and fetch previous messages
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
  }, [projectId]);

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
      timestamp: new Date().toISOString(), // Add timestamp
    };

    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  const handleTyping = () => {
    socket.emit("typing", projectId, userId, username);
    setTimeout(() => {
      socket.emit("stopTyping", projectId, userId);
    }, 3000); // Stop typing after 3 seconds of inactivity
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex flex-wrap p-4 md:space-x-4 h-[90%]">
      {/* Online & typing users section */}
      <div className="bg-indigo-100 rounded-md p-4 w-[18%] md:block hidden">
        <div>
          <h3 className="font-semibold text-sm">Online Users</h3>
          <ul>
            {onlineUsers.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Typing Users</h3>
          <ul>
            {Array.from(typingUsers.values()).map((username, index) => (
              <li key={index}>{username}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Message section */}
      <div className="bg-yellow-100 rounded-md p-4 md:w-[79%] w-full flex flex-col gap-4">
        <div className="overflow-y-auto h-custom">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <div className="text-sm text-gray-500">
                  {formatTimestamp(message.timestamp)}
                </div>
                <div>
                  <strong>{message.senderUsername}</strong>: {message.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form
          className="flex flex-row bg-yellow-100 p-4 border-t border-gray-300"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="px-2.5 py-1.5 rounded-md w-full outline-none border border-black"
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
