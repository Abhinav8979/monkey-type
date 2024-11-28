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
  checkSphereRoomExist,
  setSphereRoomWord,
  getSphereRoomWord,
  deletePlayerSphereData,
  setSphereMessageData,
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
  // ONE VS ONE ROOM
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

  // SPHERE ROOM
  socket.on("player:disconnected:sphere-room", (roomid) => {
    if (roomid) {
      socket.leave(roomid);
      spherePlayerData.delete(roomid);
      deletePlayerSphereData(roomid);
    }
  });

  socket.on("player:joined:sphere-room", ({ roomid, name, inviteRoomid }) => {
    if (inviteRoomid !== null && !checkSphereRoomExist(inviteRoomid)) {
      socket.emit("wrong:sphere-room-id", inviteRoomid);
      return;
    }

    socket.join(roomid);
    spherePlayerData.set(roomid, { name: name });
    addPlayerToRoom(roomid, name);
    const exist = checkSphereRoomExist(roomid);
    
    if (exist) {
      const word = getSphereRoomWord(roomid);
      io.to(roomid).emit("player:joined:sphere-room", {
        data: spherePlayerData,
        word: word,
      });
    } else {
      const words = generateWords();
      setSphereRoomWord(roomid, words);
      io.to(roomid).emit("player:joined:sphere-room", {
        data: spherePlayerData,
        word: words,
      });
    }
  });

  socket.on("message:sphere-room", ({ roomid, message, name }) => {
    io.to(roomid).emit("message:sphere-room", {
      message: message,
      name: name,
    });
    const newMessage = setSphereMessageData(roomid, message, name);
    io.to(roomid).emit("message:sphere-room:broadcast", newMessage);
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
