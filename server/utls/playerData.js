const oneVsOneRoomMap = new Map();

const sphereRoomMap = new Map();
const sphereRoomWord = new Map();
const spherePlayerData = new Map();
const sphereMessageData = new Map();

// ONE VS ONE
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

// SPHERE ROOM

exports.checkSphereRoomExist = (roomid) => {
  const exist = sphereRoomMap[roomid];
  return exist;
};

exports.getSphereRoomWord = (roomid) => {
  const word = sphereRoomWord[roomid];
  return word;
};

exports.setSphereRoomWord = (roomid, word) => {
  sphereRoomMap[roomid] = word;
  sphereRoomWord.set(roomid, word);
};

exports.removeSphereRoomPlayer = (roomid, name) => {
  sphereRoomMap.delete();
};

const removeFromMap = (map, roomid, socketId) => {
  if (map.has(roomid)) {
    const itemList = map.get(roomid);
    const updatedList = itemList.filter((item) => item.socketId !== socketId);

    if (updatedList.length > 0) {
      map.set(roomid, updatedList);
    } else {
      map.delete(roomid);
    }
  }
};
exports.deletePlayerSphereData = (roomid, socketId) => {
  removeFromMap(sphereRoomMap, roomid, socketId);
  removeFromMap(sphereRoomWord, roomid, socketId);
  removeFromMap(spherePlayerData, roomid, socketId);
};

exports.addPlayerToRoom = (roomid, name, noOfWordsTyped = null) => {
  if (!spherePlayerData.has(roomid)) {
    spherePlayerData.set(roomid, []);
  }
  if (noOfWordsTyped !== null) {
    spherePlayerData.get(roomid).push({ name, noOfWordsTyped });
  } else {
    spherePlayerData.get(roomid).push({ name, noOfWordsTyped: 0 });
  }
  return spherePlayerData;
};

exports.setSphereMessageData = (roomid, message, senderName) => {
  if (!sphereMessageData.has(roomid)) {
    sphereMessageData.set(roomid, [{ text: message, senderName: senderName }]);
  } else {
    sphereMessageData
      .get(roomid)
      .push({ text: message, senderName: senderName });
  }
  return { text: message, senderName: senderName };
};
