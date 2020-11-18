module.exports = class Question {
  constructor({ id, questionId, description, mappedAnswers: answers }) {
    this.id = id;
    this.questionId = questionId;
    this.description = description;
    this.answers = answers;
  }
};
