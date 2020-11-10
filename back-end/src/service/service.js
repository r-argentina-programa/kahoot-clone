/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

const { getSocketsInRoom } = require('../api/socketIO');

function updatePlayerList(namespace) {
  const socketsInRoom = getSocketsInRoom(namespace);

  namespace.players = socketsInRoom;

  const playerNames = socketsInRoom.map((socket) => socket.playerName);

  namespace.emit('playerlist', playerNames);
}

function calculatePodium(players) {
  const sortedArray = [];
  const podium = {};

  players.forEach((player) => {
    sortedArray.push([player.playerName, player.score]);
  });

  sortedArray.sort((a, b) => {
    return b[1] - a[1];
  });

  for (let i = 0; i < sortedArray.length; i++) {
    podium[i] = { name: sortedArray[i][0], score: sortedArray[i][1] };
  }

  return podium;
}

function sendQuestion(namespace) {
  const { trivia, counter, players } = namespace;

  if (counter === trivia.length) {
    namespace.emit('podium', calculatePodium(players));
  } else {
    namespace.emit('question', {
      question: trivia[counter].question,
      options: trivia[counter].options,
    });
  }
}

function nextQuestion(namespace) {
  namespace.counter++;
  namespace.players.forEach((player) => {
    player.answered = false;
  });
  sendQuestion(namespace);
}

function setScore(socket, answer) {
  const { nsp: namespace } = socket;
  const { trivia, counter } = namespace;

  if (!socket.answered) {
    socket.answered = true;
    if (answer === trivia[counter].correct) {
      socket.score++;
    }
  }
}

module.exports = {
  updatePlayerList,
  nextQuestion,
  sendQuestion,
  setScore,
};
