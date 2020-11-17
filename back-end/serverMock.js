/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const PORT = 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

const io = socketIO(server);
app.use(express.static(path.join(__dirname, 'build')));
let namespace;

const trivia = [
  {
    question: 'Which is the biggest planet in the Solar System?',
    options: [
      { id: 1, description: 'Venus' },
      { id: 2, description: 'JUPITER' },
      { id: 3, description: 'Mercury' },
      { id: 4, description: 'Mars' },
    ],
  },
  {
    question: 'Which is the largest animal?',
    options: [
      { id: 1, description: 'cow' },
      { id: 2, description: 'dog' },
      { id: 3, description: 'MOSQUITO' },
      { id: 4, description: 'WHALE' },
    ],
  },
  {
    question: 'Which is the largest number?',
    options: [
      { id: 1, description: '1' },
      { id: 2, description: '2' },
    ],
  },
];

app.get('/host-game', (req, res) => {
  const { pin } = req.query;

  namespace = io.of(`/${pin}`);

  namespace.on('connection', (socket) => {
    console.log('client connected');

    socket.join('gameroom');
  });

  res.json({ connected: true });
});

app.get('/start-game', (req, res) => {
  console.log('emiting a game!');
  const { questionNumber } = req.query;

  namespace.emit('question', {
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ gameStarted: true });
});

app.get('/next-question', (req, res) => {
  const { questionNumber } = req.query;

  namespace.emit('question', {
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ questionSent: true });
});

app.get('/podium', (req, res) => {
  namespace.emit('podium', {
    0: { name: 'Nicolas Rivarola', score: 3 },
    1: { name: 'Hernan Peralta', score: 2 },
    2: { name: 'Leonel Gauna', score: 1 },
  });

  res.json({ podiumSent: true });
});

// below this is the mock server for the host path

app.get('/trivialist', (req, res) => {
  const triviaData = {
    triviaList: [
      { id: 1, name: 'trivia1' },
      { id: 1, name: 'trivia2' },
    ],
    pin: Math.floor(Math.random() * 10),
  };
  res.json(triviaData);
});

app.get('/trivia/:pin/:selectedTrivia', (req, res) => {
  const { pin } = req.params;

  namespace = io.of(`/${pin}`);
  namespace.counter = 0;

  namespace.on('connection', (socket) => {
    console.log('client connected');

    if (Object.values(namespace.clients().connected).length === 1) {
      console.log('host joined!');
      socket.host = true;
    }

    if (!socket.host) {
      console.log('player joined!');
      socket.join('gameroom');
    }

    socket.on('start-game', () => {
      namespace.emit('question', {
        question: trivia[namespace.counter].question,
        options: trivia[namespace.counter].options,
      });
    });

    socket.on('next-question', () => {
      namespace.counter += 1;
      namespace.emit('question', {
        question: trivia[namespace.counter].question,
        options: trivia[namespace.counter].options,
      });
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  });

  res.json({ connected: true });
});

app.get('/answers', (req, res) => {
  namespace.emit('mini-podium', [
    { option: 1, count: 1 },
    { option: 2, count: 0 },
  ]);
  res.json({ miniPodiumSent: true });
});
