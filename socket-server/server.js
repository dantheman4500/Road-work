const express = require('express');
const http =  require("http");
const { Server , Socket }  = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());
//* app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
let onlineUsers = [];
const addNewUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId });
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (username) => {
    return onlineUsers.find((user) => user.username === username);
};
io.on("connection", (socket) => {
    //* console.log("User connected: ", socket.id);
    Socket.on("join_chat", (data) => {
        addNewUser(data === null || data === void 0 ? void 0 : data.userId, socket.id);
        io.emit("userOnline", onlineUsers);
        console.log(onlineUsers);
        console.log(`User connected with id: ${data === null || data === void 0 ? void 0 : data.userId}`);
    });
    Socket.on("sent_request", (data) => {
        console.log(`Friend Request sent to id: ${data.id} and name: ${data.name}`);
        socket.to(data.id).emit("friend_request", {
            res: data.cUser,
            message: `${data.cUser.name} sent you a friend Request`,
        });
    });
    Socket.on("addUser", (data) => {
        Socket.join(data === null || data === void 0 ? void 0 : data.room);
        console.log(`A user entered chat: ${data === null || data === void 0 ? void 0 : data.room}`);
    });
    Socket.on("sendMessage", ({ senderId, receiverId, text, conversationId, createdAt }) => {
        //* const user = getUser(receiverId);
        Socket.to(conversationId).emit("getMessage", {
            senderId,
            receiverId,
            text,
            conversationId,
            createdAt,
        });
        console.log(`Text:${text} from convId:${conversationId}`);
    });
    Socket.on("test", (data) => {
        socket.broadcast.emit("test2", data);
    });
    Socket.on("disconnect", () => {
        //* let i = onlineUsers.indexOf(socket.id);
        //* onlineUsers.splice(i, 1, 0);
        removeUser(socket.id);
        io.emit("userOnline", onlineUsers);
        console.log("User disconnected: ", Socket.id);
    });
});
server.listen(8900, () => {
    console.log(`Web Socket connecting running at Port:8900!`);;
});
