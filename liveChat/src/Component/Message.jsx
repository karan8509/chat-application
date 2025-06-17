import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

const Message = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:7000", {
      withCredentials: true,
    });

    // Receive message from server
    socket.on("message-user", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    if (input.trim() === "") return;
    socket.emit("message-user", input);
    setMessages((prev) => [...prev, input]);    
    setInput("");
  };

  return (
    <div className="flex flex-col h-[90vh] bg-gray-100 p-4 text-sm">
      {/* Messages Box */}
      <div className="flex-1 overflow-y-auto mb-3 p-3 bg-white rounded shadow">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 px-3 rounded mb-2 max-w-[70%] ${
              msg === input
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Input & Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
