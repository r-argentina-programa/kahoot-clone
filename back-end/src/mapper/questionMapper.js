const Question = require('../entity/question');
const { fromDbToEntity: fromDbToAnswerEntity } = require('./answerMapper');

function fromDbToEntity(question) {
  const { id, fk_trivia: triviaId, description, Answers: answers } = question;
  const mappedAnswers = answers.map((answer) => fromDbToAnswerEntity(answer));
  return new Question({ id, triviaId, description, mappedAnswers });
}

module.exports = {
  fromDbToEntity,
};
