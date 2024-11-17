const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./routes/userRoute.js");
const path = require("path");
const cors = require("cors");
const {
  availableOneVsOneRoom,
  insertOneVsOneRoom,
  removeOneVsOneRoom,
  getRoomIdBySocketId,
  generateWords,
} = require("./utls/playerData.js");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/users", userRoutes);

const io = new Server(server, {
  cors: {
    origin: "*", // Replace  URL in production
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("player:finding:one-vs-one-room", ({ roomid, name }) => {
    const roomAvailable = availableOneVsOneRoom();
    if (roomAvailable === -1) {
      insertOneVsOneRoom(roomid, socket.id, name);
      socket.join(roomid);
      return;
    }
    socket.join(roomAvailable.roomid);
    io.to(roomAvailable.roomid).emit("player:joined:one-vs-one-room", {
      socketId: roomAvailable.socketid,
      name: roomAvailable.name,
      roomid: roomAvailable.roomid,
    });
  });

  socket.on("game:start:one-vs-one-room", (roomid) => {
    const words = generateWords();
    socket.emit("game:start:one-vs-one-room", words);
  });

  socket.on("player:disconnected", (roomid) => {
    if (roomid) {
      socket.leave(roomid);
      removeOneVsOneRoom(roomid);
    }
  });
  socket.on("disconnect", () => {
    const id = getRoomIdBySocketId(socket.id);
    if (id) {
      removeOneVsOneRoom(id);
    }
  });
});

const PORT = process.env.PORT || 5353;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
