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

function connectToTrivia(triviaId, io) {
  const namespace = io.of(`/${triviaId}`);

  return namespace.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}

app.get('/trivialist', (req, res) => {
  res.json({ triviaList: Object.keys(triviaList), pin: generatePIN() });
});

app.get('/trivia/:pin', (req, res) => {
  const triviaId = req.params.pin;
  connectToTrivia(triviaId, io);
});
