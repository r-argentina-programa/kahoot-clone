module.exports = class Trivia {
  constructor({ id, name, mappedQuestions: questions }) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
};
