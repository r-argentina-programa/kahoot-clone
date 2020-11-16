const Sequelize = require('sequelize');
const TriviaModel = require('../../model/triviaModel');
const AnswerModel = require('../../model/answerModel');
const QuestionModel = require('../../model/questionModel');
const GameModel = require('../../model/gameModel');
const PlayerModel = require('../../model/playerModel');
const PlayerAnswerModel = require('../../model/playerAnswerModel');
const KahootRepository = require('../repository');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
});

let kahootRepository;

beforeAll(() => {
  TriviaModel.setup(sequelize);
  QuestionModel.setup(sequelize);
  AnswerModel.setup(sequelize);
  GameModel.setup(sequelize);
  PlayerModel.setup(sequelize);
  PlayerAnswerModel.setup(sequelize);

  TriviaModel.setupAssociations(QuestionModel, GameModel);
  QuestionModel.setupAssociations(AnswerModel);
  GameModel.setupAssociations(PlayerModel);
  PlayerModel.setupAssociations(PlayerAnswerModel);
  AnswerModel.setupAssociations(PlayerAnswerModel);
});

beforeEach(async () => {
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
  ]);

  await AnswerModel.bulkCreate([
    {
      description: 'JUPITER',
      fk_question: questions[0].id,
      is_correct: true,
    },
  ]);

  kahootRepository = new KahootRepository(AnswerModel, QuestionModel, TriviaModel);
});

describe('Repository tests', () => {
  test('getAllTrivias returns the complete trivia list', async () => {
    const triviaList = await kahootRepository.getAllTrivias();
    expect(triviaList.length).toEqual(2);
  });

  test('getTriviaById returns the trivia with the given id', async () => {
    const triviaMock = {
      id: 1,
      name: 'trivia1',
      questions: [
        {
          id: 1,
          fk_trivia: 1,
          description: 'Which is the biggest planet in the Solar System?',
          Answers: [{ id: 1, description: 'JUPITER', fk_question: 1, is_correct: true }],
        },
      ],
    };

    const trivia = await kahootRepository.getTriviaById(1);

    expect(trivia).toEqual(triviaMock);
  });
});
