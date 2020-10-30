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
    options: ["Venus", "Jupiter", "Mercury", "Mars"],
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
      socket.emit('game ended', calculatePodium(players))
    }
    else{
      io.of('/').emit('question', {question: trivia[counter].question, options: trivia[counter].options});
    }
  }

  function calculatePodium(players) {
    let sortedArray = []
    let podium = {}

    for (player in players){
      sortedArray.push([player, players[player].score])
    }
    
    sortedArray.sort(function(a, b) {
        return b[1] - a[1];
    });

    for (let i = 0; i < (sortedArray.length > 3 ? 3 : sortedArray.length); i++) {
      podium[i] = {name:sortedArray[i][0], score:sortedArray[i][1]}
    }

    return podium; 
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

  socket.on('next question', () => {
    counter ++;
    showNextQuestion();
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    updatePlayerList()
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
