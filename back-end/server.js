require('dotenv').config();
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const io = socketIO(server);

const trivia = [
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

let players = {};

function updatePlayerList() {
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    io.emit('players', clients);
    players = {};
    clients.forEach((client) => (players[client] = { score: 0, answered: false }));
  });
}

function calculatePodium(players) {
  let sortedArray = [];
  let podium = {};

  for (player in players) {
    sortedArray.push([player, players[player].score]);
  }

  sortedArray.sort(function (a, b) {
    return b[1] - a[1];
  });

  for (let i = 0; i < sortedArray.length; i++) {
    podium[i] = { name: sortedArray[i][0], score: sortedArray[i][1] };
  }

  return podium;
}

let counter = 0;

io.on('connection', (socket) => {
  console.log('Client connected');
  updatePlayerList();

  function showNextQuestion() {
    for (const key in players) {
      players[key].answered = false;
    }
    if (counter === trivia.length) {
      players[socket.client.id].answered = false;
      io.of('/').emit('game ended', calculatePodium(players));
    } else {
      io.emit('question', {
        question: trivia[counter].question,
        options: trivia[counter].options,
      });
    }
  }

  socket.on('answer', (data) => {
    if (!players[socket.client.id].answered) {
      players[socket.client.id].answered = true;
      if (data === trivia[counter].correct) {
        players[socket.client.id].score += 1;
      }
      if (
        Object.values(players).filter((elem) => elem.answered === true).length ===
        Object.keys(players).length
      ) {
        counter++;
        showNextQuestion();
      }
    }
  });

  socket.on('new game', () => {
    counter = 0;
    showNextQuestion();
    io.emit('toTrivia');
  });

  socket.on('next question', () => {
    counter++;
    showNextQuestion();
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    updatePlayerList();
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
