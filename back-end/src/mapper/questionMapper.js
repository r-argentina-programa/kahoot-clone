const Question = require('../entity/question');

function fromDataToEntity({ id, trivia, description, answers }) {
  return new Question({
    id,
    trivia,
    description,
    answers,
  });
}

function fromDbToEntity(modelInstance) {
  return new Question(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
