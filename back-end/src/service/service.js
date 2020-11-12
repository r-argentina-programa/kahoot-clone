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

  if (counter === trivia.Questions.length) {
    namespace.emit('podium', calculatePodium(players));
  } else {
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
