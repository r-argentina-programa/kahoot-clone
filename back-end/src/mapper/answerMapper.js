const Answer = require('../entity/answer');

function fromDataToEntity({ id, description, questionId, isCorrect }) {
  return new Answer({
    id,
    description,
    questionId,
    isCorrect,
  });
}

function fromDbToEntity(answer) {
  return new Answer(answer);
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
