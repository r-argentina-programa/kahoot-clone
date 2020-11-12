const AnswerModel = require('../model/answerModel');
const QuestionModel = require('../model/questionModel');
const TriviaModel = require('../model/triviaModel');

async function getAllTrivias() {
  const triviasData = await TriviaModel.findAll({ attributes: ['id', 'name'] });
  return triviasData.map((triviaData) => triviaData.toJSON());
}

async function getTriviaById(id) {
  const answers = await TriviaModel.findAll({
    attributes: ['name'],
    include: [
      {
        model: QuestionModel,
        where: {
          fk_trivia: id,
        },
        attributes: ['description'],
        include: [
          {
            model: AnswerModel,
            attributes: ['id', 'description', 'is_correct'],
          },
        ],
      },
    ],
  });

  const trivia = answers.map((answer) => answer.toJSON());
  return trivia[0];
}

module.exports = { getTriviaById, getAllTrivias };
