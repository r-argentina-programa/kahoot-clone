const { updatePlayerList, nextQuestion, sendQuestion, setScore } = require('../../service/service');
const { getTriviaById, getAll } = require('../../repository/repository');
const { getAllSockets, createNamespace } = require('../../api/socketIO');
const { setRoutes } = require('../controller');

jest.mock('../../service/service');
jest.mock('../../repository/repository');
jest.mock('../../api/socketIO');

afterEach(() => {
  jest.clearAllMocks();
});

describe('setRoutes', () => {
  it('Sets an endpoint to fetch json data', () => {
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

    setRoutes(appMock, ioMock);
    const routeCallback = appMock.get.mock.calls[0][1];

    getAll.mockReturnValueOnce({ trivia1: [], trivia2: [] });

    routeCallback(reqMock, resMock);

    expect(appMock.get).toHaveBeenCalledTimes(2);
    expect(appMock.get).toHaveBeenNthCalledWith(1, '/trivialist', expect.any(Function));
    expect(resMock.json).toHaveBeenNthCalledWith(1, {
      triviaList: expect.any(Array),
      pin: expect.any(Number),
    });
  });

  it('Sets an endpoint to establish a connection with websockets', () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {
      of: jest.fn(),
    };
    const reqMock = {
      params: { pin: '1', selectedTrivia: 'trivia1' },
    };
    const resMock = {
      json: jest.fn(),
    };
    const namespaceMock = {
      on: jest.fn(),
    };

    setRoutes(appMock, ioMock);
    const routeCallback = appMock.get.mock.calls[1][1];

    createNamespace.mockReturnValueOnce(namespaceMock);
    getTriviaById.mockReturnValueOnce([]);

    routeCallback(reqMock, resMock);

    expect(appMock.get).toHaveBeenCalledTimes(2);
    expect(appMock.get).toHaveBeenNthCalledWith(
      2,
      '/trivia/:pin/:selectedTrivia',
      expect.any(Function)
    );
    expect(createNamespace).toHaveBeenCalledWith(ioMock, reqMock.params.pin);
    expect(getTriviaById).toHaveBeenCalledWith(reqMock.params.selectedTrivia);
    expect(namespaceMock.counter).toBe(0);
    expect(namespaceMock.players).toEqual([]);
    expect(namespaceMock.trivia).toEqual([]);
    expect(namespaceMock.on).toHaveBeenCalledTimes(1);
    expect(namespaceMock.on).toHaveBeenCalledWith('connection', expect.any(Function));
    expect(resMock.json).toHaveBeenNthCalledWith(1, { connected: true });
  });

  it('Sets event listeners', () => {
    const appMock = {
      get: jest.fn(),
    };
    const ioMock = {
      of: jest.fn(),
    };
    const reqMock = {
      params: { pin: '1', selectedTrivia: 'trivia1' },
    };
    const resMock = {
      json: jest.fn(),
    };
    const namespaceMock = {
      on: jest.fn(),
      emit: jest.fn(),
    };
    const socketMock = {
      on: jest.fn(),
      join: jest.fn(),
      nsp: namespaceMock,
      request: {
        _query: {
          playerName: 'john doe',
        },
      },
    };
    const answerMock = '1';

    setRoutes(appMock, ioMock);
    const routeCallback = appMock.get.mock.calls[1][1];

    createNamespace.mockReturnValueOnce(namespaceMock);
    getTriviaById.mockReturnValueOnce([]);

    routeCallback(reqMock, resMock);
    const namespaceCallback = namespaceMock.on.mock.calls[0][1];

    getAllSockets.mockReturnValueOnce([]);

    namespaceCallback(socketMock);

    const socketCallback1 = socketMock.on.mock.calls[0][1];
    const socketCallback2 = socketMock.on.mock.calls[1][1];
    const socketCallback3 = socketMock.on.mock.calls[2][1];
    const socketCallback4 = socketMock.on.mock.calls[3][1];

    socketCallback1();
    socketCallback2();
    socketCallback3(answerMock);
    socketCallback4();

    expect(getAllSockets).toHaveBeenCalledWith(namespaceMock);

    expect(sendQuestion).toHaveBeenCalledWith(namespaceMock);
    expect(nextQuestion).toHaveBeenCalledWith(namespaceMock);
    expect(setScore).toHaveBeenCalledWith(socketMock, answerMock);
    expect(updatePlayerList).toHaveBeenNthCalledWith(2, namespaceMock);
  });
});
