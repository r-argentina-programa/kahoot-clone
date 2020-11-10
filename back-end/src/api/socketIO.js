function createNamespace(io, name) {
  return io.of(`/${name}`);
}

function getAllSockets(namespace) {
  return Object.values(namespace.clients().connected);
}

function getSocketsInRoom(namespace) {
  const socketsConnected = Object.values(namespace.clients().connected);
  const room = namespace.adapter.rooms.gameroom;

  if (!room) {
    return [];
  }

  const socketsInRoomIds = Object.keys(room.sockets);

  return socketsConnected.filter((socket) => socketsInRoomIds.includes(socket.id));
}

module.exports = {
  createNamespace,
  getAllSockets,
  getSocketsInRoom,
};
