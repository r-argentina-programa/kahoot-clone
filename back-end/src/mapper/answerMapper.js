const Answer = require('../entity/answer');

function fromDataToEntity({ id, description, questionId, isCorrect }) {
  return new Answer({
    id,
    description,
    questionId,
    isCorrect,
  });
}

function fromDbToEntity(modelInstance) {
  return new Answer(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
