module.exports = class Player {
  constructor({ id, gameId, name, sessionId }) {
    this.id = id;
    this.gameId = gameId;
    this.name = name;
    this.sessionId = sessionId;
  }
};
