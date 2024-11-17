const oneVsOneRoomMap = new Map();

exports.availableOneVsOneRoom = () => {
  if (oneVsOneRoomMap.size === 0) {
    return -1;
  }

  const roomIds = Array.from(oneVsOneRoomMap.keys());
  const randomRoomId = roomIds[Math.floor(Math.random() * roomIds.length)];
  return { roomid: randomRoomId, ...oneVsOneRoomMap.get(randomRoomId) };
};

exports.insertOneVsOneRoom = (roomid, socketid, name) => {
  oneVsOneRoomMap.set(roomid, { socketid, name });
};

exports.removeOneVsOneRoom = (roomId) => {
  oneVsOneRoomMap.delete(roomId);
};

exports.getRoomIdBySocketId = (socketId) => {
  for (const [roomid, { socketid }] of oneVsOneRoomMap.entries()) {
    if (socketid === socketId) {
      return roomid;
    }
  }
  return null;
};

exports.generateWords = () => {
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam similique iste sit officia magni impedit natus repellat suscipit reprehenderit ex corrupti illum sunt nemo eaque labore cumque est laboriosam architecto, odit mollitia? Libero asperiores assumenda quae magnam maiores voluptates, minima dolore, voluptatem, sit aliquid mollitia voluptate inventore ab. Sint magni enim eius laudantium ut.Magnam laudantium reprehenderit veniam itaque dolorum?";
  const wordArray = text.split(" ");
  return wordArray;
};
