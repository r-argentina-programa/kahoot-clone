const AnswerModel = require('../model/answerModel');
const QuestionModel = require('../model/questionModel');
const TriviaModel = require('../model/triviaModel');

async function initDb(sequelize) {
  await TriviaModel.setup(sequelize);
  await QuestionModel.setup(sequelize);
  await AnswerModel.setup(sequelize);

  await TriviaModel.setupAssociations(QuestionModel);
  await QuestionModel.setupAssociations(AnswerModel);

  await sequelize.sync({ force: true });

  const trivias = await TriviaModel.bulkCreate([
    {
      name: 'trivia1',
    },
    {
      name: 'trivia2',
    },
  ]);

  const questions = await QuestionModel.bulkCreate([
    {
      fk_trivia: trivias[0].id,
      description: 'Which is the biggest planet in the Solar System?',
    },
    {
      fk_trivia: trivias[0].id,
      description: 'Which is the largest animal?',
    },
    {
      fk_trivia: trivias[0].id,
      description: 'Which is the largest number?',
    },
    {
      fk_trivia: trivias[1].id,
      description: 'Which is the biggest country?',
    },
    {
      fk_trivia: trivias[1].id,
      description: 'What is the color of the sky?',
    },
    {
      fk_trivia: trivias[1].id,
      description: 'Which animal is the fastest?',
    },
  ]);

  await AnswerModel.bulkCreate([
    {
      description: 'Venus',
      fk_question: questions[0].id,
      is_correct: false,
    },
    {
      description: 'JUPITER',
      fk_question: questions[0].id,
      is_correct: true,
    },
    {
      description: 'Mars',
      fk_question: questions[0].id,
      is_correct: false,
    },
    {
      description: 'Cow',
      fk_question: questions[1].id,
      is_correct: false,
    },
    {
      description: 'Dog',
      fk_question: questions[1].id,
      is_correct: false,
    },
    {
      description: 'Mosquito',
      fk_question: questions[1].id,
      is_correct: false,
    },
    {
      description: 'WHALE',
      fk_question: questions[1].id,
      is_correct: true,
    },
    {
      description: '1',
      fk_question: questions[2].id,
      is_correct: false,
    },
    {
      description: '2',
      fk_question: questions[2].id,
      is_correct: false,
    },
    {
      description: '1000000',
      fk_question: questions[2].id,
      is_correct: true,
    },
    {
      description: 'Uruguay',
      fk_question: questions[3].id,
      is_correct: false,
    },
    {
      description: 'BRAZIL',
      fk_question: questions[3].id,
      is_correct: true,
    },
    {
      description: 'Paraguay',
      fk_question: questions[3].id,
      is_correct: false,
    },
    {
      description: 'Peru',
      fk_question: questions[3].id,
      is_correct: false,
    },
    {
      description: 'Yellow',
      fk_question: questions[4].id,
      is_correct: false,
    },
    {
      description: 'Green',
      fk_question: questions[4].id,
      is_correct: false,
    },
    {
      description: 'BLUE',
      fk_question: questions[4].id,
      is_correct: true,
    },
    {
      description: 'Pink',
      fk_question: questions[4].id,
      is_correct: false,
    },
    {
      description: 'CHEETAH',
      fk_question: questions[5].id,
      is_correct: true,
    },
    {
      description: 'Turtle',
      fk_question: questions[5].id,
      is_correct: false,
    },
    {
      description: 'Sloth',
      fk_question: questions[5].id,
      is_correct: false,
    },
    {
      description: 'Dog',
      fk_question: questions[5].id,
      is_correct: false,
    },
  ]);
}

module.exports = { initDb };
