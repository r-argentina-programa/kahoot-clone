module.exports = class Question {
  constructor({ id, fk_trivia: triviaId, description, Answers: answers }) {
    this.id = id;
    this.triviaId = triviaId;
    this.description = description;
    this.answers = answers;
  }
};
