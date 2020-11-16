/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

module.exports = class KahootService {
  constructor(kahootRepository) {
    this.kahootRepository = kahootRepository;
  }

  async getTriviaById(id) {
    const trivia = await this.kahootRepository.getTriviaById(id);
    return trivia;
  }

  async getAllTrivias() {
    const trivias = await this.kahootRepository.getAllTrivias();
    return trivias;
  }

  configureMiniPodium(namespace, options) {
    namespace.miniPodium = options.map((option) => {
      return { option: option.id, count: 0 };
    });
  }

  updatePlayerList(namespace) {
    const socketsInRoom = this.getSocketsInRoom(namespace);

    namespace.players = socketsInRoom;

    const playerNames = socketsInRoom.map((socket) => socket.playerName);

    namespace.emit('playerlist', playerNames);
  }

  calculatePodium(players) {
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

  startTimer(namespace) {
    namespace.timer = 6;
    namespace.interval = setInterval(() => {
      namespace.timer--;
      namespace.emit('timer', namespace.timer);
      if (namespace.timer === 0) {
        clearInterval(namespace.interval);
      }
    }, 1000);
  }

  sendQuestion(namespace) {
    const { trivia, counter, players } = namespace;

    if (counter === trivia.questions.length) {
      namespace.emit('podium', this.calculatePodium(players));
    } else {
      this.startTimer(namespace);
      const questionDescription = trivia.questions[counter].description;
      const questionOptions = trivia.questions[counter].Answers.map((answer) => {
        return { id: answer.id, description: answer.description };
      });
      this.configureMiniPodium(namespace, questionOptions);
      namespace.emit('question', {
        question: questionDescription,
        options: questionOptions,
      });
    }
  }

  sendMiniPodium(namespace) {
    namespace.emit('mini-podium', namespace.miniPodium);
  }

  showScoreboard(namespace) {
    namespace.emit('scoreboard', this.calculatePodium(namespace.players));
  }

  nextQuestion(namespace, callback) {
    namespace.counter++;
    namespace.players.forEach((player) => {
      player.answered = false;
    });
    clearInterval(namespace.interval);
    callback(namespace);
  }

  setScore(socket, answerId) {
    const { nsp: namespace } = socket;
    const { trivia, counter } = namespace;

    if (!socket.answered) {
      socket.answered = true;
      const playerAnswer = trivia.questions[counter].Answers.filter(
        (answer) => answer.id === answerId
      )[0];
      namespace.miniPodium.filter((option) => option.option === playerAnswer.id)[0].count++;

      if (playerAnswer.is_correct) {
        socket.score += namespace.timer;
      }
    }
  }

  getAllSockets(namespace) {
    return Object.values(namespace.clients().connected);
  }

  getSocketsInRoom(namespace) {
    const socketsConnected = Object.values(namespace.clients().connected);

    const room = namespace.adapter.rooms.gameroom;

    if (!room) {
      return [];
    }

    const socketsInRoomIds = Object.keys(room.sockets);

    return socketsConnected.filter((socket) => socketsInRoomIds.includes(socket.id));
  }
};
