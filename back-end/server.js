require('dotenv').config();

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const uuid = require('uuid');

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const trivia1 = [
  {
    question: 'Which is the biggest planet in the Solar System?',
    options: ['Venus', 'JUPITER', 'Mercury', 'Mars'],
    correct: 1,
  },
  {
    question: 'Which is the largest animal?',
    options: ['Cow', 'Dog', 'Mosquito', 'WHALE'],
    correct: 3,
  },
  {
    question: 'Which is the largest number?',
    options: ['1', '2', '3', '1000000'],
    correct: 3,
  },
];

const trivia2 = [
  {
    question: 'Which is the biggest country?',
    options: ['Uruguay', 'BRAZIL', 'Paraguay', 'Peru'],
    correct: 1,
  },
  {
    question: 'What is the color of the sky?',
    options: ['Yellow', 'Green', 'BLUE', 'Pink'],
    correct: 2,
  },
  {
    question: 'Which animal is the fastest?',
    options: ['CHEETAH', 'Turtle', 'Sloth', 'Dog'],
    correct: 0,
  },
];

const triviaList = { trivia1, trivia2 };

let rooms = {};
let socketsInLobby = [];

function joinRoom(socket, room) {
  room.sockets.push(socket);
}

function updateLobbyList(sockets) {
  const socketsIds = sockets.map((socket) => socket.id);
  io.emit('players', socketsIds);
}

function calculatePodium(sockets) {
  let sortedArray = [];
  let podium = {};

  sockets.forEach((socket) => {
    sortedArray.push([socket.id, socket.score]);
  });

  sortedArray.sort(function (a, b) {
    return b[1] - a[1];
  });

  for (let i = 0; i < sortedArray.length; i++) {
    podium[i] = { name: sortedArray[i][0], score: sortedArray[i][1] };
  }

  return podium;
}

function showNextQuestion({ id: roomId, sockets, counter }) {
  if (counter === trivia.length) {
    io.to(roomId).emit('game ended', calculatePodium(sockets));
  } else {
    sockets.forEach((socket) => {
      socket.answered = false;
    });

    io.to(roomId).emit('question', {
      question: trivia[counter].question,
      options: trivia[counter].options,
    });
  }
}

function getAllSockets() {
  return Object.values(io.sockets.sockets);
}

function joinRoom(sockets) {
  const room = {
    id: uuid.v4(),
    sockets,
    counter: 0,
  };

  sockets.forEach((socket) => socket.join(room.id));

  return room;
}

function leaveRoom(socket) {
  for (roomId in rooms) {
    const room = rooms[roomId];
    if (room.sockets.includes(socket)) {
      socket.leave(roomId);
      room.sockets = room.sockets.filter((skt) => skt !== socket);
      if (room.sockets.length === 0) {
        delete rooms[roomId];
      }
    }
  }
}

function getSocketsInRooms() {
  if (Object.keys(rooms).length === 0) {
    return null;
  }

  const playersInRooms = [];

  for (roomId in rooms) {
    playersInRooms.push(...rooms[roomId].sockets);
  }

  return playersInRooms;
}

function getSocketsInLobby(socketsConnected, socketsInRooms) {
  if (!socketsConnected || !socketsInRooms) {
    return null;
  }

  return socketsConnected.filter((socket) => !socketsInRooms.includes(socket));
}

function findRoom(socket) {
  for (roomId in rooms) {
    const room = rooms[roomId];
    if (room.sockets.includes(socket)) {
      return room;
    }
  }

  return null;
}

function initScores(sockets) {
  sockets.forEach((socket) => {
    socket.score = 0;
  });
}

io.on('connection', (socket) => {
  console.log('Client connected');

  const socketsInRooms = getSocketsInRooms();

  if (!socketsInRooms) {
    socketsInLobby = getAllSockets();
    updateLobbyList(socketsInLobby);
  } else {
    const socketsConnected = getAllSockets();
    socketsInLobby = getSocketsInLobby(socketsConnected, socketsInRooms);
    updateLobbyList(socketsInLobby);
  }

  socket.on('new game', () => {
    const room = joinRoom(socketsInLobby);
    rooms[room.id] = room;
    initScores(room.sockets);
    showNextQuestion(room);
    io.to(room.id).emit('toTrivia');
  });

  socket.on('answer', (index) => {
    const room = findRoom(socket);

    socket.answered = true;

    if (index === trivia[room.counter].correct) {
      socket.score += 1;
    }

    const everyoneAnswered = room.sockets.every((socket) => socket.answered === true);

    if (everyoneAnswered) {
      room.counter++;
      showNextQuestion(room);
    }
  });

  socket.on('exit', () => {
    const room = findRoom(socket);

    if (room) {
      leaveRoom(socket);
    }

    const socketsInRooms = getSocketsInRooms();

    if (!socketsInRooms) {
      socketsInLobby = getAllSockets();
      updateLobbyList(socketsInLobby);
    } else {
      const socketsConnected = getAllSockets();
      socketsInLobby = getSocketsInLobby(socketsConnected, socketsInRooms);
      updateLobbyList(socketsInLobby);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    leaveRoom(socket);

    const socketsInRooms = getSocketsInRooms();

    if (!socketsInRooms) {
      socketsInLobby = getAllSockets();
      updateLobbyList(socketsInLobby);
    } else {
      const socketsConnected = getAllSockets();
      socketsInLobby = getSocketsInLobby(socketsConnected, socketsInRooms);
      updateLobbyList(socketsInLobby);
    }
  });
});
