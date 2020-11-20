module.exports = class Game {
  constructor({ id, fk_trivia: triviaId, namespace, ongoing }) {
    this.id = id;
    this.triviaId = triviaId;
    this.namespace = namespace;
    this.ongoing = ongoing;
  }
};
