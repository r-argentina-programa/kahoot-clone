const Player = require('../entity/player');

function fromDbToEntity(modelInstance) {
  return new Player(modelInstance.toJSON());
}

module.exports = {
  fromDbToEntity,
};
