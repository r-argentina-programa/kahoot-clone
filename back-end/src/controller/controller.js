/* eslint-disable no-param-reassign */

const { updatePlayerList, nextQuestion, sendQuestion, setScore } = require('../service/service');
const { getTriviaById, getAllTrivias } = require('../repository/repository');
const { getAllSockets, createNamespace } = require('../api/socketIO');

function setNamespaceConnection(namespace, callback) {
  namespace.on('connection', callback);
}

function setSocketListeners(socket) {
  socket.on('start-game', () => {
    const { nsp: namespace } = socket;
    sendQuestion(namespace);
  });

  socket.on('next-question', () => {
    const { nsp: namespace } = socket;
    nextQuestion(namespace);
  });

  socket.on('answer', (answer) => {
    setScore(socket, answer);
  });

  socket.on('disconnect', () => {
    const { nsp: namespace } = socket;
    updatePlayerList(namespace);

    console.log('Client disconnected');
  });
}

function configurePlayerParams(socket) {
  // eslint-disable-next-line no-underscore-dangle
  socket.playerName = socket.request._query.playerName;
  socket.score = 0;
  socket.answered = false;
}

function namespaceConnectionCallback(socket) {
  console.log('Client connected');

  const { nsp: namespace } = socket;
  const sockets = getAllSockets(namespace);

  if (sockets.length === 1) {
    socket.host = true;
  }

  if (!socket.host) {
    console.log('player joined room!');
    socket.join('gameroom');
    configurePlayerParams(socket);
    updatePlayerList(namespace);
  }

  setSocketListeners(socket);
}

async function configureNamespace(namespace, triviaId) {
  const trivia = await getTriviaById(Number(triviaId));

  namespace.counter = 0;
  namespace.players = [];
  namespace.trivia = trivia;
}

function generatePIN() {
  return Math.floor(Math.random() * 10);
}

function setRoutes(app, io) {
  app.get('/trivialist', async (req, res) => {
    const trivias = await getAllTrivias();
    const pin = generatePIN();
    res.json({ triviaList: trivias, pin });
  });

  app.get('/trivia/:pin/:selectedTrivia', (req, res) => {
    const { pin, selectedTrivia } = req.params;
    const namespace = createNamespace(io, pin);
    configureNamespace(namespace, selectedTrivia);
    setNamespaceConnection(namespace, namespaceConnectionCallback);
    res.json({ connected: true });
  });
}

module.exports = { setRoutes };
