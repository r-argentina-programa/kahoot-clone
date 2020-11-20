const PlayerAnswer = require('../entity/playerAnswer');

function fromDbToEntity(modelInstance) {
  return new PlayerAnswer(modelInstance.toJSON());
}

module.exports = {
  fromDbToEntity,
};
