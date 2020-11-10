const triviaList = require('../../data/trivias');

function getTriviaById(id) {
  return triviaList[id];
}

function getAll() {
  return triviaList;
}

module.exports = { getTriviaById, getAll };
