module.exports = class PlayerAnswer {
  constructor({ id, playerId, answerId, score }) {
    this.id = id;
    this.playerId = playerId;
    this.answerId = answerId;
    this.score = score;
  }
};
