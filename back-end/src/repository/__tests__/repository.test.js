const Sequelize = require('sequelize');
const TriviaModel = require('../../model/triviaModel');
const AnswerModel = require('../../model/answerModel');
const QuestionModel = require('../../model/questionModel');
const KahootRepository = require('../repository');

let mockTriviaDb;
let mockQuestionDb;
let mockAnswerDb;

async function initDb(sequelize) {
  mockTriviaDb = TriviaModel.setup(sequelize);
  mockQuestionDb = QuestionModel.setup(sequelize);
  mockAnswerDb = AnswerModel.setup(sequelize);

  TriviaModel.setupAssociations(QuestionModel);
  QuestionModel.setupAssociations(AnswerModel);
}

beforeEach(async () => {
  const sequelizeInstance = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });
  initDb(sequelizeInstance);
  await sequelizeInstance.sync({ force: true });
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
  ]);
  await AnswerModel.bulkCreate([
    {
      description: 'JUPITER',
      fk_question: questions[0].id,
      is_correct: true,
    },
  ]);
});

describe('Repository tests', async () => {
  test('getAllTrivias returns the complete trivia list', async () => {
    const kahootRepository = new KahootRepository(mockAnswerDb, mockQuestionDb, mockTriviaDb);
    const triviaList = await kahootRepository.getAllTrivias();
    expect(triviaList.length).toEqual(2);
  });

  test('getTriviaById returns the trivia with the given id', async () => {
    const kahootRepository = new KahootRepository(mockAnswerDb, mockQuestionDb, mockTriviaDb);

    const triviaMock = {
      name: 'trivia1',
      Questions: [
        {
          description: 'Which is the biggest planet in the Solar System?',
          Answers: [{ id: 1, description: 'JUPITER', is_correct: true }],
        },
      ],
    };
    const trivia = await kahootRepository.getTriviaById(1);

    expect(trivia).toEqual(triviaMock);
  });
});
