module.exports = class Answer {
  /**
   * @param {number} id
   * @param {string} description
   * @param {number} questionId
   * @param {boolean} isCorrect
   */
  constructor({ id, description, fk_question: questionId, is_correct: isCorrect }) {
    this.id = id;
    this.description = description;
    this.questionId = questionId;
    this.isCorrect = isCorrect;
  }
};
