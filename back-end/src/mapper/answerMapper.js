const Answer = require('../entity/answer');

function fromDbToEntity(answer) {
  return new Answer(answer);
}

module.exports = {
  fromDbToEntity,
};
