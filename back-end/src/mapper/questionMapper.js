const Question = require('../entity/question');
const { fromDbToEntity: fromDbToAnswerEntity } = require('./answerMapper');

function fromDataToEntity({ id, trivia, description, answers }) {
  return new Question({
    id,
    trivia,
    description,
    answers,
  });
}

function fromDbToEntity(question) {
  const { id, fk_trivia: questionId, description, Answers: answers } = question;
  const mappedAnswers = answers.map((answer) => fromDbToAnswerEntity(answer));
  return new Question({ id, questionId, description, mappedAnswers });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
