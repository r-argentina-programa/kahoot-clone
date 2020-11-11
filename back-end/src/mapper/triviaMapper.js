const Trivia = require("../entity/trivia");

function fromDataToEntity({ id, name, questions }) {
  return new Trivia({
    id,
    name,
    questions,
  });
}

function fromDbToEntity({ id, name, questions }) {
  return new Trivia({
    id,
    name,
    questions,
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};

