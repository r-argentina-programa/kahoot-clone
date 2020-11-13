/* eslint-disable no-console */
const express = require('express');
const socketIO = require('socket.io');

const PORT = 5000;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

const io = socketIO(server);
let userNamespace;

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

  userNamespace = io.of(`/${pin}`);

  userNamespace.on('connection', (socket) => {
    console.log('client connected');

    socket.join('gameroom');
  });

  res.json({ connected: true });
});

app.get('/start-game', (req, res) => {
  const { questionNumber } = req.query;

  userNamespace.emit('question', {
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ gameStarted: true });
});

app.get('/next-question', (req, res) => {
  const { questionNumber } = req.query;

  userNamespace.emit('question', {
    question: trivia[questionNumber].question,
    options: trivia[questionNumber].options,
  });

  res.json({ questionSent: true });
});

app.get('/podium', (req, res) => {
  userNamespace.emit('podium', {
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

/* app.get('/trivia/:pin/:selectedTrivia', (req, res) => {
  console.log('hey');
  const { pin, selectedTrivia } = req.params;
  console.log(pin);
  console.log(selectedTrivia);
  hostNamespace = io.of(`/${pin}`);

  hostNamespace.on('connection', (socket) => {
    console.log('host connected');
  });

  res.json({ connected: true });
}); */
