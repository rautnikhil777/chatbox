const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ✅ Username set karne ke liye event listen karo
    socket.on("setUsername", (username) => {
        socket.username = username;
        console.log(`${username} connected`);
    });

    // ✅ Message ke saath username ko broadcast karo
    socket.on("sendMessage", ({ message }) => {
        const sender = socket.username || "Anonymous";
        io.emit("receiveMessage", { message, sender });
    });

    socket.on("disconnect", () => {
        console.log(`${socket.username || "User"} disconnected`);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
