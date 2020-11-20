const Trivia = require('../entity/trivia');
const { fromDbToEntity: fromDbToQuestionEntity } = require('./questionMapper');

function fromDataToEntity({ id, name, questions }) {
  return new Trivia({
    id,
    name,
    questions,
  });
}

function fromDbToEntity(modelInstance) {
  const trivia = modelInstance.toJSON();
  if (trivia.Questions) {
    const { id, name, Questions: questions } = trivia;
    const mappedQuestions = questions.map((question) => fromDbToQuestionEntity(question));
    return new Trivia({ id, name, mappedQuestions });
  }
  return new Trivia(trivia);
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};
