import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatBox = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [joined, setJoined] = useState(false);

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
            socket.emit("setUsername", username); // ✅ Username ko backend pe bhejo
            setJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { message }); // ✅ Message ke saath username backend ko bhejo
            setMessage("");
        }
    };

    return (
        <div>
            {!joined ? (
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name..."
                    />
                    <button onClick={joinChat}>Join</button>
                </div>
            ) : (
                <div>
                    <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc" }}>
                        {messages.map((msg, index) => (
                            <div key={index}>
                                <strong>{msg.sender}: </strong>{msg.message}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
