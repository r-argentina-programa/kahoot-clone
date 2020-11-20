const Game = require('../entity/game');

function fromDataToEntity(id, triviaId, namespace, ongoing) {
  return new Game({
    id,
    triviaId,
    namespace,
    ongoing,
  });
}

function fromDbToEntity(modelInstance) {
  return new Game(modelInstance.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
