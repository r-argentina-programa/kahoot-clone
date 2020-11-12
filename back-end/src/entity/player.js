module.exports = class Player {
  constructor({ id, name, socket, gameId }) {
    this.id = id;
    this.name = name;
    this.socket = socket;
    this.gameId = gameId;
  }
};
