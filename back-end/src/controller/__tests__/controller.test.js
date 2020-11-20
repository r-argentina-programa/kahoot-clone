const KahootController = require('../controller');

const kahootServiceMock = {
  getAllTrivias: jest.fn(),
  getTriviaById: jest.fn(),
  sendQuestion: jest.fn(),
  nextQuestion: jest.fn(),
  setScore: jest.fn(),
  sendMiniPodium: jest.fn(),
  showScoreboard: jest.fn(),
  updatePlayerList: jest.fn(),
  getAllSockets: jest.fn(),
  saveGame: jest.fn(),
  savePlayers: jest.fn(),
  getStats: jest.fn(),
};
const pathMock = {
  join: jest.fn(),
};

const kahootController = new KahootController(kahootServiceMock, pathMock);

describe('Tests KahootController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('configureRoutes configures the routes', () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {
      of: jest.fn(),
    };

    kahootController.configureRoutes(appMock, ioMock);

    expect(appMock.get).toHaveBeenCalledTimes(4);
    expect(appMock.get).toHaveBeenNthCalledWith(1, '/trivialist', expect.any(Function));
    expect(appMock.get).toHaveBeenNthCalledWith(
      2,
      '/trivia/:pin/:selectedTrivia',
      expect.any(Function)
    );
    expect(appMock.get).toHaveBeenNthCalledWith(3, '/stats', expect.any(Function));
    expect(appMock.get).toHaveBeenNthCalledWith(4, '/*', expect.any(Function));
  });

  test('/trivialist route returns a trivia list with a game pin', async () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {
      of: jest.fn(),
    };
    const reqMock = {};
    const resMock = {
      json: jest.fn(),
    };
    const trivias = ['trivia1', 'trivia2'];

    kahootController.configureRoutes(appMock, ioMock);

    const routeCallback = appMock.get.mock.calls[0][1];

    kahootServiceMock.getAllTrivias.mockResolvedValueOnce(trivias);

    await routeCallback(reqMock, resMock);

    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith({ triviaList: trivias, pin: expect.any(Number) });
  });

  test('/stats route returns a specific object', async () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {};
    const reqMock = {};
    const resMock = {
      json: jest.fn(),
    };

    kahootController.configureRoutes(appMock, ioMock);

    const routeCallback = appMock.get.mock.calls[2][1];

    kahootServiceMock.getStats.mockReturnValueOnce({ stat1: 'stat1', stat2: 'stat2' });

    await routeCallback(reqMock, resMock);

    expect(kahootServiceMock.getStats).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith({ stat1: 'stat1', stat2: 'stat2' });
  });

  test('/* route sends a specific file', async () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {};
    const reqMock = {};
    const resMock = {
      sendFile: jest.fn(),
    };

    kahootController.configureRoutes(appMock, ioMock);

    const routeCallback = appMock.get.mock.calls[3][1];

    await routeCallback(reqMock, resMock);

    expect(resMock.sendFile).toHaveBeenCalledTimes(1);
    expect(kahootController.path.join).toHaveBeenCalledTimes(1);
    expect(kahootController.path.join).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(String)
    );
  });

  test('setNamespaceConnection sets the connection to the namespace', () => {
    const namespaceMock = {
      on: jest.fn(),
    };
    const callbackFn = jest.fn();

    kahootController.setNamespaceConnection(namespaceMock, callbackFn);
    expect(namespaceMock.on).toHaveBeenCalledWith('connection', callbackFn);
  });

  test('setSocketListeners configures the socket events', () => {
    const socketMock = {
      namespace: {},
      on: jest.fn(),
    };
    kahootController.setSocketListeners(socketMock);
    expect(socketMock.on).toHaveBeenCalledWith('start-game', expect.any(Function));
    expect(socketMock.on).toHaveBeenCalledWith('next-question', expect.any(Function));
    expect(socketMock.on).toHaveBeenCalledWith('answer', expect.any(Function));
    expect(socketMock.on).toHaveBeenCalledWith('show-mini-podium', expect.any(Function));
    expect(socketMock.on).toHaveBeenCalledWith('show-scoreboard', expect.any(Function));
    expect(socketMock.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
  });

  test('configurePlayerParams configures the parameters of the players', () => {
    const socketMock = { request: { _query: { playerName: 'player1' } } };
    kahootController.configurePlayerParams(socketMock);

    expect(socketMock.playerName).toBe('player1');
    expect(socketMock.score).toBe(0);
    expect(socketMock.answered).toBe(false);
  });

  test('namespaceConnectionCallback sets the first client connected as the host', () => {
    const preMockSetSockets = kahootController.setSocketListeners;

    kahootController.setSocketListeners = jest.fn();
    kahootController.configurePlayerParams = jest.fn();

    kahootServiceMock.getAllSockets = () => {
      return [{ on: jest.fn() }];
    };
    const socketMock = { nsp: {}, request: { session: { save: jest.fn() } } };

    kahootController.namespaceConnectionCallback(socketMock);
    expect(socketMock.host).toBe(true);
    expect(socketMock.request.session.save).toHaveBeenCalledTimes(1);
    kahootController.setSocketListeners = preMockSetSockets;
  });

  test('namespaceConnectionCallback redirects the player to a room if there is a host in the namespace', () => {
    const preMockSetSockets = kahootController.setSocketListeners;
    kahootController.setSocketListeners = jest.fn();
    kahootServiceMock.getAllSockets = () => {
      return [{ socket: { someData: 'data' } }, { socket: { someData: 'data' } }];
    };
    const socketMock = {
      join: jest.fn(),
      request: { session: { save: jest.fn() } },
    };

    kahootController.namespaceConnectionCallback(socketMock);
    expect(socketMock.join).toHaveBeenCalledWith('gameroom');
    expect(kahootController.setSocketListeners).toHaveBeenCalledTimes(1);
    expect(kahootServiceMock.updatePlayerList).toHaveBeenCalledTimes(1);
    expect(kahootController.configurePlayerParams).toHaveBeenCalledTimes(1);
    expect(socketMock.request.session.save).toHaveBeenCalledTimes(1);

    kahootController.setSocketListeners = preMockSetSockets;
  });

  test('configureNamespace configures the namespace', async () => {
    const namespaceMock = {};
    const triviaId = 1;

    await kahootController.configureNamespace(namespaceMock, triviaId);
    expect(kahootServiceMock.getTriviaById).toHaveBeenCalledWith(triviaId);
    expect(namespaceMock.counter).toBe(0);
    expect(namespaceMock.players).toEqual([]);
    expect(namespaceMock.timer).toBe(10);
    expect(namespaceMock.miniPodium).toEqual([]);
  });

  test('socket event on start-game ', async () => {
    const namespaceMock = { trivia: { id: '1' }, name: 'someName', players: ['hernan'] };
    const socketMock = {
      nsp: namespaceMock,
      on: jest.fn(),
      request: {
        session: {
          id: 'someSession',
        },
      },
    };

    kahootController.setSocketListeners(socketMock);

    const startGameCallback = socketMock.on.mock.calls[0][1];

    kahootServiceMock.saveGame.mockResolvedValueOnce({ id: '1' });

    await startGameCallback();

    expect(socketMock.on).toHaveBeenNthCalledWith(1, 'start-game', expect.any(Function));
    expect(kahootServiceMock.saveGame).toHaveBeenCalledTimes(1);
    expect(kahootServiceMock.saveGame).toHaveBeenCalledWith(
      namespaceMock.trivia.id,
      namespaceMock.name,
      true
    );
    expect(kahootServiceMock.savePlayers).toHaveBeenCalledTimes(1);
    expect(kahootServiceMock.savePlayers).toHaveBeenCalledWith(
      namespaceMock.players,
      '1',
      socketMock.request.session.id
    );
    expect(kahootServiceMock.sendQuestion).toHaveBeenCalledTimes(1);
    expect(kahootServiceMock.sendQuestion).toHaveBeenCalledWith(namespaceMock);
  });

  test('socket event on next-question ', () => {
    const socketMock = {
      nsp: {},
      on: jest.fn(),
    };
    kahootController.setSocketListeners(socketMock);
    const nextQuestionCallback = socketMock.on.mock.calls[1][1];
    nextQuestionCallback();
    expect(kahootServiceMock.nextQuestion).toHaveBeenCalledWith(
      socketMock.nsp,
      expect.any(Function)
    );
  });

  test('socket event on answer ', () => {
    const socketMock = {
      on: jest.fn(),
    };

    const answerMock = {};
    kahootController.setSocketListeners(socketMock);
    const answerCallback = socketMock.on.mock.calls[2][1];
    answerCallback(answerMock);
    expect(kahootServiceMock.setScore).toHaveBeenCalledWith(socketMock, answerMock);
  });

  test('socket event on show-mini-podium', () => {
    const socketMock = {
      nsp: {},
      on: jest.fn(),
    };

    kahootController.setSocketListeners(socketMock);
    const answerCallback = socketMock.on.mock.calls[3][1];
    answerCallback();
    expect(kahootServiceMock.sendMiniPodium).toHaveBeenCalledWith(socketMock.nsp);
  });

  test('socket event on show-scoreboard', () => {
    const socketMock = {
      nsp: {},
      on: jest.fn(),
    };

    kahootController.setSocketListeners(socketMock);
    const showScoreboardCallback = socketMock.on.mock.calls[4][1];
    showScoreboardCallback();
    expect(kahootServiceMock.showScoreboard).toHaveBeenCalledWith(socketMock.nsp);
  });

  test('socket event on disconnect', () => {
    const socketMock = {
      nsp: {},
      on: jest.fn(),
    };

    kahootController.setSocketListeners(socketMock);
    const disconnectCallback = socketMock.on.mock.calls[5][1];
    disconnectCallback();
    expect(kahootServiceMock.updatePlayerList).toHaveBeenCalledWith(socketMock.nsp);
  });

  test('/trivia/:pin/:selectedTrivia route setups the game', async () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {
      of: jest.fn(),
    };
    const reqMock = {
      params: {
        pin: '1',
        selectedTrivia: 'trivia1',
      },
    };
    const resMock = {
      json: jest.fn(),
    };
    const namespaceMock = {};

    kahootController.configureRoutes(appMock, ioMock);

    const routeCallback = appMock.get.mock.calls[1][1];

    ioMock.of.mockReturnValueOnce(namespaceMock);

    const { configureNamespace } = kahootController;
    const { setNamespaceConnection } = kahootController;
    const { namespaceConnectionCallback } = kahootController;

    kahootController.configureNamespace = jest.fn();
    kahootController.setNamespaceConnection = jest.fn();
    kahootController.namespaceConnectionCallback = jest.fn();

    await routeCallback(reqMock, resMock);

    expect(ioMock.of).toHaveBeenCalledTimes(1);
    expect(ioMock.of).toHaveBeenCalledWith('/1');
    expect(kahootController.configureNamespace).toHaveBeenCalledTimes(1);
    expect(kahootController.configureNamespace).toHaveBeenCalledWith(
      namespaceMock,
      reqMock.params.selectedTrivia
    );
    expect(kahootController.setNamespaceConnection).toHaveBeenCalledTimes(1);
    expect(kahootController.setNamespaceConnection).toHaveBeenCalledWith(
      namespaceMock,
      expect.any(Function)
    );
    expect(resMock.json).toHaveBeenCalledTimes(1);
    expect(resMock.json).toHaveBeenCalledWith({ connected: true });

    kahootController.configureNamespace = configureNamespace;
    kahootController.setNamespaceConnection = setNamespaceConnection;
    kahootController.namespaceConnectionCallback = namespaceConnectionCallback;
  });
});
