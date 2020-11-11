module.exports = class Question {
  constructor({ id, triviaId, description, answers }) {
    this.id = id;
    this.triviaId = triviaId;
    this.description = description;
    this.answers = answers;
  }
};
