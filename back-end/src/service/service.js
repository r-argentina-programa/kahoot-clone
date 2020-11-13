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

function startTimer(namespace) {
  namespace.timer = 6;
  namespace.interval = setInterval(() => {
    namespace.timer--;
    namespace.emit('timer', namespace.timer);
    if (namespace.timer === 0) {
      clearInterval(namespace.interval);
    }
  }, 1000);
}

function sendQuestion(namespace) {
  const { trivia, counter, players } = namespace;

  if (counter === trivia.Questions.length) {
    namespace.emit('podium', calculatePodium(players));
  } else {
    startTimer(namespace);
    const questionDescription = trivia.Questions[counter].description;
    const questionOptions = trivia.Questions[counter].Answers.map((answer) => {
      return { id: answer.id, description: answer.description };
    });
    namespace.emit('question', {
      question: questionDescription,
      options: questionOptions,
    });
  }
}

function nextQuestion(namespace) {
  namespace.counter++;
  namespace.players.forEach((player) => {
    player.answered = false;
  });
  clearInterval(namespace.interval);
  sendQuestion(namespace);
}

function setScore(socket, answerId) {
  const { nsp: namespace } = socket;
  const { trivia, counter } = namespace;

  if (!socket.answered) {
    socket.answered = true;
    const playerAnswer = trivia.Questions[counter].Answers.filter(
      (answer) => answer.id === answerId
    )[0];

    if (playerAnswer.is_correct) {
      socket.score += namespace.timer;
    }
  }
}

module.exports = {
  updatePlayerList,
  nextQuestion,
  sendQuestion,
  setScore,
};
