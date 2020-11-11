module.exports = class Question {
  constructor({ id, triviaId, description }) {
    this.id = id;
    this.triviaId = triviaId;
    this.description = description;
  }
};
