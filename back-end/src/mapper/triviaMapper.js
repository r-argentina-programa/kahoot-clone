const Trivia = require('../entity/trivia');

function fromDataToEntity({ id, name, questions }) {
  return new Trivia({
    id,
    name,
    questions,
  });
}

function fromDbToEntity(modelInstance) {
  return new Trivia(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
