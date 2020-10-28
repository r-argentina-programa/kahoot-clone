require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static('back-end/public'));
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

function updatePlayerList() {
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    io.emit('players', clients);
  })
};


io.on('connection', (socket) => {
  console.log('Client connected');
  updatePlayerList()
  
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    updatePlayerList()
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
