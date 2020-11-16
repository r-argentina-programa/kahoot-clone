module.exports = class Trivia {
  constructor({ id, name, Questions: questions }) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
};
