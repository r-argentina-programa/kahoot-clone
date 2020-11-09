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
app.use(express.urlencoded());

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

function generatePIN() {
  return Math.floor(Math.random() * 10);
}

function connectToTrivia(pin, io, selectedTrivia) {
  const namespace = io.of(`/${pin}`);
  namespace.counter = 0;
  namespace.players = {};

  function updatePlayerList(namespace, players) {
    Object.keys(players).forEach((player) => delete players[player]);
    const socketList = Object.keys(namespace.adapter.rooms['gameroom'].sockets);
    const playerList = [];

    socketList.forEach((elem, index) => {
      players[elem] = {
        name: namespace.connected[socketList[index]].playerName,
        score: 0,
        answered: false,
      };
      playerList.push(players[elem].name);
    });
    namespace.emit('playerlist', playerList);
  }

  function showNextQuestion(namespace) {
    if (namespace.counter === triviaList[selectedTrivia].length) {
      namespace.emit('podium', calculatePodium(namespace.players));
    } else {
      namespace.emit('question', {
        question: triviaList[selectedTrivia][namespace.counter].question,
        options: triviaList[selectedTrivia][namespace.counter].options,
      });
    }
  }

  function calculatePodium(players) {
    let sortedArray = [];
    let podium = {};

    for (player in players) {
      sortedArray.push([players[player].name, players[player].score]);
    }

    sortedArray.sort(function (a, b) {
      return b[1] - a[1];
    });

    for (let i = 0; i < sortedArray.length; i++) {
      podium[i] = { name: sortedArray[i][0], score: sortedArray[i][1] };
    }

    return podium;
  }

  return namespace.on('connection', (socket) => {
    console.log('Client connected');

    if (Object.keys(namespace.clients().connected).length === 1) {
      socket.host = true;
    }

    if (!socket.host) {
      socket.join('gameroom');
      socket.playerName = socket.request._query['playerName'];
      updatePlayerList(namespace, namespace.players);
    }

    socket.on('next-question', () => {
      namespace.counter++;
      showNextQuestion(namespace);
      for (const key in namespace.players) {
        namespace.players[key].answered = false;
      }
    });

    socket.on('start-game', () => {
      namespace.counter = 0;
      showNextQuestion(namespace);
    });

    socket.on('answer', (data) => {
      const player = Object.keys(socket.client.sockets)[1];
      if (!namespace.players[player].answered) {
        namespace.players[player].answered = true;
        if (data === triviaList[selectedTrivia][namespace.counter].correct) {
          namespace.players[player].score += 1;
        }
      }
    });

    socket.on('disconnect', () => {
      updatePlayerList(namespace, namespace.players);
      console.log('Client disconnected');
    });
  });
}

app.get('/trivialist', (req, res) => {
  res.json({ triviaList: Object.keys(triviaList), pin: generatePIN() });
});

app.get('/trivia/:pin/:selectedTrivia', (req, res) => {
  const pin = req.params.pin;
  const selectedTrivia = req.params.selectedTrivia;
  connectToTrivia(pin, io, selectedTrivia);
  res.json({});
});
