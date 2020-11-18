const Game = require('../entity/game');

function fromDataToEntity({ id, triviaId, namespace }) {
  return new Game({
    id,
    triviaId,
    namespace,
  });
}

function fromDbToEntity(modelInstance) {
  return new Game(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
