/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

module.exports = class KahootController {
  constructor(kahootService, path) {
    this.kahootService = kahootService;
    this.path = path;
  }

  configureRoutes(app, io) {
    app.get('/trivialist', async (req, res) => {
      const trivias = await this.kahootService.getAllTrivias();
      const pin = Math.floor(Math.random() * 1000000);
      res.json({ triviaList: trivias, pin });
    });

    app.get('/trivia/:pin/:selectedTrivia', async (req, res) => {
      const { pin, selectedTrivia } = req.params;
      const namespace = io.of(`/${pin}`);
      await this.configureNamespace(namespace, selectedTrivia);
      this.setNamespaceConnection(namespace, this.namespaceConnectionCallback.bind(this));
      res.json({ connected: true });
    });

    app.get('/stats', async (req, res) => {
      const stats = await this.kahootService.getStats();
      res.json(stats);
    });

    app.get('/*', (req, res) => {
      res.sendFile(this.path.join(__dirname, '../../build', 'index.html'));
    });
  }

  setNamespaceConnection(namespace, callback) {
    namespace.on('connection', callback);
  }

  setSocketListeners(socket) {
    socket.on('start-game', async () => {
      const { nsp: namespace } = socket;

      const savedGame = await this.kahootService.saveGame(
        namespace.trivia.id,
        namespace.name,
        true
      );
      namespace.gameId = savedGame.id;

      await this.kahootService.savePlayers(
        namespace.players,
        savedGame.id,
        socket.request.session.id
      );
      await this.kahootService.sendQuestion(namespace);
    });

    socket.on('next-question', () => {
      const { nsp: namespace } = socket;
      this.kahootService.nextQuestion(
        namespace,
        this.kahootService.sendQuestion.bind(this.kahootService)
      );
    });

    socket.on('answer', async (answerId) => {
      await this.kahootService.setScore(socket, answerId);
    });

    socket.on('show-mini-podium', () => {
      const { nsp: namespace } = socket;
      this.kahootService.sendMiniPodium(namespace);
    });

    socket.on('show-scoreboard', () => {
      const { nsp: namespace } = socket;
      this.kahootService.showScoreboard(namespace);
    });

    socket.on('disconnect', () => {
      const { nsp: namespace } = socket;
      this.kahootService.updatePlayerList(namespace);

      console.log('Client disconnected');
    });
  }

  configurePlayerParams(socket) {
    // eslint-disable-next-line no-underscore-dangle
    socket.playerName = socket.request._query.playerName;
    socket.score = 0;
    socket.answered = false;
  }

  namespaceConnectionCallback(socket) {
    console.log('Client connected');

    const { session } = socket.request;
    session.save();

    const { nsp: namespace } = socket;
    const sockets = this.kahootService.getAllSockets(namespace);

    if (sockets.length === 1) {
      console.log('host joined!');
      socket.host = true;
    }

    if (!socket.host) {
      console.log('player joined room!');
      socket.join('gameroom');
      this.configurePlayerParams(socket);
      this.kahootService.updatePlayerList(namespace);
    }

    this.setSocketListeners(socket);
  }

  async configureNamespace(namespace, triviaId) {
    const trivia = await this.kahootService.getTriviaById(Number(triviaId));

    namespace.counter = 0;
    namespace.players = [];
    namespace.trivia = trivia;
    namespace.timer = 10;
    namespace.miniPodium = [];
  }
};
