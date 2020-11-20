const KahootService = require('../service');

const kahootRepositoryMock = {
  getAllTrivias: jest.fn(),
  getTriviaById: jest.fn(),
  saveGame: jest.fn(),
  savePlayer: jest.fn(),
  savePlayerAnswer: jest.fn(),
  setGameToEnded: jest.fn(),
  getMostPlayedTrivias: jest.fn(),
  getTotalTriviaNumber: jest.fn(),
  getmostDifficultQuestions: jest.fn(),
  getTotalPlayers: jest.fn(),
  getTotalGames: jest.fn(),
};

const kahootService = new KahootService(kahootRepositoryMock);

describe('Service module test', () => {
  test('getTriviaById calls the repository once', async () => {
    await kahootService.getTriviaById(1);
    expect(kahootRepositoryMock.getTriviaById).toHaveBeenCalledTimes(1);
  });

  test('getAllTrivias calls the repository once', async () => {
    await kahootService.getAllTrivias();
    expect(kahootRepositoryMock.getAllTrivias).toHaveBeenCalledTimes(1);
  });

  test('configureMiniPodium returns the minipodium object', () => {
    const namespaceMock = {};
    const optionsMock = [{ id: 1, count: 1 }];
    const minipodiumMock = [{ option: 1, count: 0 }];

    kahootService.configureMiniPodium(namespaceMock, optionsMock);

    expect(namespaceMock.miniPodium).toEqual(minipodiumMock);
  });

  test('startTimer resets the seconds counter and starts the countdown', () => {
    const namespaceMock = {
      emit: jest.fn(),
    };

    kahootService.startTimer(namespaceMock);
    expect(namespaceMock.timer).toBe(20);
    expect(namespaceMock.interval).toEqual(expect.any(Number));
  });

  test('startTimer clears the interval when timer = 0', () => {
    const namespaceMock = {
      emit: jest.fn(),
    };
    jest.useFakeTimers();
    kahootService.startTimer(namespaceMock);
    jest.advanceTimersByTime(20000);
    expect(namespaceMock.timer).toBe(0);
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  test('updatePlayerList updates the player list', () => {
    const preMock = kahootService.getSocketsInRoom;
    kahootService.getSocketsInRoom = jest.fn().mockImplementationOnce(() => {
      return [{ playerName: 'player1' }, { playerName: 'player2' }];
    });
    const namespaceMock = {
      emit: jest.fn(),
    };

    kahootService.updatePlayerList(namespaceMock);
    expect(kahootService.getSocketsInRoom).toHaveBeenCalledWith(namespaceMock);
    expect(namespaceMock.emit).toHaveBeenCalledWith('playerlist', ['player1', 'player2']);
    kahootService.getSocketsInRoom = preMock;
  });

  test('getSocketsInRoom returns a list with sockets', () => {
    const namespaceMock = {
      adapter: {
        rooms: {
          gameroom: {
            sockets: { '/3#f8roY-ecs0m7ujhaAAAD': true, '/2#a6roY-ecs0m7ujhafffD': true },
            length: 2,
          },
        },
      },
      clients: () => {
        return {
          connected: [{ id: '/3#f8roY-ecs0m7ujhaAAAD' }, { id: '/2#a6roY-ecs0m7ujhafffD' }],
        };
      },
    };
    const socketsInRoomMock = [
      { id: '/3#f8roY-ecs0m7ujhaAAAD' },
      { id: '/2#a6roY-ecs0m7ujhafffD' },
    ];
    const sockets = kahootService.getSocketsInRoom(namespaceMock);
    expect(sockets).toEqual(socketsInRoomMock);
  });

  test('getSocketsInRoom returns an empty array when there are no players connected', () => {
    const namespaceMock = {
      adapter: {
        rooms: {},
      },
      clients: () => {
        return {
          connected: [],
        };
      },
    };
    const socketsInRoomMock = [];
    const sockets = kahootService.getSocketsInRoom(namespaceMock);
    expect(sockets).toEqual(socketsInRoomMock);
  });

  test('getAllSockets returns all sockets in the namespace', () => {
    const namespaceMock = {
      clients: () => {
        return {
          connected: [{ socket: { someData: 'data' } }, { socket: { someData: 'data' } }],
        };
      },
    };
    const socketListMock = [{ socket: { someData: 'data' } }, { socket: { someData: 'data' } }];

    const sockets = kahootService.getAllSockets(namespaceMock);
    expect(sockets).toEqual(socketListMock);
  });

  test('nextQuestion sends the next question', () => {
    const preMock = global.clearInterval;
    global.clearInterval = jest.fn().mockImplementationOnce(() => {});

    const sendQuestionMock = jest.fn();

    const namespaceMock = {
      counter: 1,
      interval: 7000,
      players: [{ answered: true }],
      trivia: { questions: {} },
    };
    kahootService.nextQuestion(namespaceMock, sendQuestionMock);
    expect(namespaceMock.counter).toBe(2);
    expect(namespaceMock.players[0].answered).toBe(false);
    expect(clearInterval).toHaveBeenCalledWith(7000);
    expect(sendQuestionMock).toHaveBeenCalledTimes(1);
    global.clearInterval = preMock;
  });

  test('sendQuestion sends the next question', () => {
    const startTimerPreMock = kahootService.startTimer;
    const configureMiniPodiumPreMock = kahootService.configureMiniPodium;
    kahootService.startTimer = jest.fn().mockImplementationOnce(() => {});
    kahootService.configureMiniPodium = jest.fn().mockImplementationOnce(() => {});
    const namespaceMock = {
      counter: 0,
      emit: jest.fn(),
      interval: 7000,
      players: [],
      trivia: { questions: [{ answers: [{ description: 'descriptionText' }] }] },
    };
    const questionResponseMock = {
      questions: undefined,
      options: [{ id: undefined, description: 'descriptionText' }],
    };

    kahootService.sendQuestion(namespaceMock);

    expect(kahootService.startTimer).toHaveBeenCalledWith(namespaceMock);
    expect(kahootService.configureMiniPodium).toHaveBeenCalledTimes(1);
    expect(namespaceMock.emit).toHaveBeenLastCalledWith('question', questionResponseMock);
    kahootService.startTimer = startTimerPreMock;
    kahootService.configureMiniPodium = configureMiniPodiumPreMock;
  });

  test('showScoreboard sends the scoreboard', () => {
    const namespaceMock = {
      emit: jest.fn(),
      players: [
        { playerName: 'player1', score: 9 },
        { playerName: 'player2', score: 7 },
        { playerName: 'player3', score: 1 },
      ],
    };

    const podiumMock = {
      0: { name: 'player1', score: 9 },
      1: { name: 'player2', score: 7 },
      2: { name: 'player3', score: 1 },
    };

    kahootService.showScoreboard(namespaceMock);
    expect(namespaceMock.emit).toHaveBeenCalledWith('scoreboard', podiumMock);
  });

  test('showMiniPodium sends the miniPodium object', () => {
    const namespaceMock = {
      emit: jest.fn(),
      players: [
        { playerName: 'player1', score: 3 },
        { playerName: 'player2', score: 2 },
        { playerName: 'player3', score: 1 },
      ],
      miniPodium: [
        { option: 1, count: 3 },
        { option: 2, count: 2 },
        { option: 3, count: 1 },
      ],
    };

    kahootService.sendMiniPodium(namespaceMock);
    expect(namespaceMock.emit).toHaveBeenCalledWith('mini-podium', namespaceMock.miniPodium);
  });

  test('setScore sets the score if the player has not answered yet and sends the correct option', () => {
    const socketMock = {
      answered: false,
      score: 0,
      nsp: {
        trivia: { questions: [{ answers: [{ id: 1, isCorrect: true }] }] },
        counter: 0,
        miniPodium: [{ option: 1, count: 0 }],
        timer: 5,
      },
    };
    kahootService.setScore(socketMock, 1);
    expect(socketMock.nsp.miniPodium[0].count).toBe(1);
    expect(socketMock.score).toBe(5);
    expect(socketMock.answered).toBe(true);
  });

  test("setScore doesn't sets the score if the player has not answered yet and sends the incorrect option", () => {
    const socketMock = {
      answered: false,
      score: 0,
      nsp: {
        trivia: { questions: [{ answers: [{ id: 1, isCorrect: false }] }] },
        counter: 0,
        miniPodium: [{ option: 1, count: 0 }],
        timer: 5,
      },
    };
    kahootService.setScore(socketMock, 1);
    expect(socketMock.nsp.miniPodium[0].count).toBe(1);
    expect(socketMock.score).toBe(0);
    expect(socketMock.answered).toBe(true);
  });

  test('setScore does not set the score if the player has answered incorrectly', () => {
    const socketMock = {
      answered: false,
      score: 0,
      nsp: {
        trivia: { questions: [{ Answers: [{ id: 1, is_correct: false }] }] },
        counter: 0,
        miniPodium: [{ option: 1, count: 0 }],
        timer: 5,
      },
    };
    kahootService.setScore(socketMock, 1);
    expect(socketMock.score).toBe(0);
  });

  test('testScore does not update score or answered properties if the player has already answered', () => {
    const socketMock = {
      answered: true,
      score: 0,
      nsp: {
        trivia: {},
        counter: 0,
      },
    };
    kahootService.setScore(socketMock, 1);
    expect(socketMock.score).toBe(0);
    expect(socketMock.answered).toBe(true);
  });

  test('sendQuestion sends the podium after the last question', () => {
    const namespaceMock = {
      emit: jest.fn(),
      players: [
        { playerName: 'player1', score: 9 },
        { playerName: 'player2', score: 7 },
        { playerName: 'player3', score: 1 },
      ],
      counter: 1,
      trivia: { questions: [{}] },
    };

    const podiumMock = {
      0: { name: 'player1', score: 9 },
      1: { name: 'player2', score: 7 },
      2: { name: 'player3', score: 1 },
    };

    kahootService.sendQuestion(namespaceMock);
    expect(namespaceMock.emit).toHaveBeenCalledWith('podium', podiumMock);
  });

  test('saveGame saves the game', async () => {
    const triviaId = 1;
    const namespaceName = 'someName';
    const ongoing = true;

    await kahootService.saveGame(triviaId, namespaceName, ongoing);

    expect(kahootRepositoryMock.saveGame).toHaveBeenCalledTimes(1);
    expect(kahootRepositoryMock.saveGame).toHaveBeenCalledWith({
      triviaId,
      namespaceName,
      ongoing,
    });
  });

  test('savePlayers saves the player', async () => {
    const socketListMock = [{ playerName: 'hernan' }];
    const gameIdMock = 1;
    const sessionIdMock = '';

    kahootRepositoryMock.savePlayer.mockReturnValueOnce({ id: 1 });

    await kahootService.savePlayers(socketListMock, gameIdMock, sessionIdMock);

    expect(kahootRepositoryMock.savePlayer).toHaveBeenCalledTimes(1);
    expect(kahootRepositoryMock.savePlayer).toHaveBeenCalledWith({
      gameId: gameIdMock,
      playerName: socketListMock[0].playerName,
      sessionId: sessionIdMock,
    });
    expect(socketListMock[0].playerId).toBe(1);
  });

  test('getStats sends the statistics', async () => {
    const totalPlayersMock = 6;
    const getTotalTriviaNumberMock = 3;

    kahootRepositoryMock.getTotalPlayers.mockResolvedValue(totalPlayersMock);
    kahootRepositoryMock.getTotalTriviaNumber.mockResolvedValue(getTotalTriviaNumberMock);

    const stats = await kahootService.getStats();

    expect(kahootRepositoryMock.getMostPlayedTrivias).toHaveBeenCalledTimes(1);
    expect(kahootRepositoryMock.getmostDifficultQuestions).toHaveBeenCalledTimes(1);
    expect(kahootRepositoryMock.getTotalPlayers).toHaveBeenCalledTimes(1);
    expect(kahootRepositoryMock.getTotalTriviaNumber).toHaveBeenCalledTimes(1);
    expect(kahootRepositoryMock.getTotalGames).toHaveBeenCalledTimes(1);
    expect(stats).toEqual({
      mostPlayedTrivias: undefined,
      mostDifficultQuestions: undefined,
      totalPlayers: 6,
      averagePlayersPerTrivia: 2,
      totalGames: undefined,
    });
  });
});
