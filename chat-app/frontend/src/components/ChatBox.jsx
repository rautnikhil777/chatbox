import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Message from "./Message";

const socket = io("http://localhost:5000");

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.on("receiveMessage", ({ message, sender }) => {
      setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit("setUsername", username);
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", { message, sender: username });
      setMessages((prevMessages) => [...prevMessages, { sender: username, message }]);
      setMessage("");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #74EBD5 0%, #ACB6E5 100%)", // ✅ Background gradient
      }}
    >
      {!joined ? (
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
          }}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={joinChat}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#007BFF",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Join
          </button>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "80vh",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* ✅ Messages List */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, index) => (
              <Message
                key={index}
                sender={msg.sender}
                text={msg.message}
                isOwn={msg.sender === username}
              />
            ))}
          </div>

          {/* ✅ Input and Emoji Picker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderTop: "1px solid #ddd",
            }}
          >
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{
                backgroundColor: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              😃
            </button>
            {showEmojiPicker && (
              <div style={{ position: "absolute", bottom: "60px", left: "30px", zIndex: 10 }}>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                marginLeft: "8px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
