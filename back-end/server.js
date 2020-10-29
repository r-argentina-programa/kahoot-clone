require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('back-end/public'));
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

const trivia = [
  {
    question: "Which is the biggest planet in the Solar System?",
    options: ["Venus", "Jupiter", "Mercurio", "Mars"],
    correct: 1,
  },
  {
    question: "Which is the largest animal?",
    options: ["Cow", "Dog", "Mosquito", "Whale"],
    correct: 3,
  }
];

let players = {};

function updatePlayerList() {
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    io.emit('players', clients);
    players = {};
    clients.forEach(client => players[client] = {score: 0})
  })
};


io.on('connection', (socket) => {
  console.log('Client connected');
  updatePlayerList()

  let counter = 0;

  function showNextQuestion() {
    if (counter === trivia.length){
      io.of('/').emit('game ended', 'GAME ENDED!')
    }
    else{
      io.of('/').emit('question', {question: trivia[counter].question, options: trivia[counter].options});
    }
  }

  socket.on('answer', (data) => {
    if (data === trivia[counter].correct){
      players[socket.client.id].score += 1;
    }
    counter ++;
    showNextQuestion();
  });

  socket.on('new game', () => {
    counter = 0;
    showNextQuestion()
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    updatePlayerList()
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
