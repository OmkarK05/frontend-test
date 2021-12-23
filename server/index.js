const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");

const users = require("./users.js");

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors);
const router = require("./router");
const httpServer = http.createServer(app);

const io = socket(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("We have a new connection");

  socket.on("join", ({ name, room }, callback) => {
    console.log(room, name, socket.id);
    const { error = "", user } = users.addUser({
      id: socket.id,
      name,
      room,
    });
    if (error) {
      callback({ error });
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.name}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.room);
  });

  socket.on("sendMessage", (message, callback) => {
    console.log(socket.id);
    const user = users.getUser(socket.id);
    console.log(message, user);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnectUser", () => {
    console.log("user has left");
  });
});

httpServer.listen(PORT, () => {
  console.log("listening at 4000");
});
