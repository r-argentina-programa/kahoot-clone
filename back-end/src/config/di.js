const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { KahootController, KahootService, KahootRepository } = require('../module');
const AnswerModel = require('../model/answerModel');
const QuestionModel = require('../model/questionModel');
const TriviaModel = require('../model/triviaModel');
const GameModel = require('../model/gameModel');
const PlayerModel = require('../model/playerModel');
const PlayerAnswerModel = require('../model/playerAnswerModel');

function configureMainDatabaseAdapter() {
  return new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
}

function configureSession(container) {
  const SECONDS_IN_A_WEEK = 604800000;
  const sequelize = container.get('Sequelize');

  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: SECONDS_IN_A_WEEK },
  };
  return session(sessionOptions);
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureMainDatabaseAdapter),
    Session: factory(configureSession),
    path,
  });
}

/**
 * @param {DIContainer} container
 */
function configureAnswerModel(container) {
  AnswerModel.setup(container.get('Sequelize'));
  AnswerModel.setupAssociations(container.get('PlayerAnswerModel'));
  return AnswerModel;
}

/**
 * @param {DIContainer} container
 */
function configureQuestionModel(container) {
  QuestionModel.setup(container.get('Sequelize'));
  QuestionModel.setupAssociations(container.get('AnswerModel'));
  return QuestionModel;
}

/**
 * @param {DIContainer} container
 */
function configureTriviaModel(container) {
  TriviaModel.setup(container.get('Sequelize'));
  TriviaModel.setupAssociations(container.get('QuestionModel'), container.get('GameModel'));
  return TriviaModel;
}

/**
 * @param {DIContainer} container
 */
function configureGameModel(container) {
  GameModel.setup(container.get('Sequelize'));
  GameModel.setupAssociations(container.get('PlayerModel'));
  return GameModel;
}

/**
 * @param {DIContainer} container
 */
function configurePlayerModel(container) {
  PlayerModel.setup(container.get('Sequelize'));
  PlayerModel.setupAssociations(container.get('PlayerAnswerModel'));
  return PlayerModel;
}

/**
 * @param {DIContainer} container
 */
function configurePlayerAnswerModel(container) {
  PlayerAnswerModel.setup(container.get('Sequelize'));
  return PlayerAnswerModel;
}

/**
 * @param {DIContainer} container
 */
function addKahootDefinitions(container) {
  container.addDefinitions({
    KahootController: object(KahootController).construct(get('KahootService'), get('path')),
    KahootService: object(KahootService).construct(get('KahootRepository')),
    KahootRepository: object(KahootRepository).construct(
      get('AnswerModel'),
      get('QuestionModel'),
      get('TriviaModel'),
      get('GameModel'),
      get('PlayerModel'),
      get('PlayerAnswerModel')
    ),
    AnswerModel: factory(configureAnswerModel),
    QuestionModel: factory(configureQuestionModel),
    TriviaModel: factory(configureTriviaModel),
    GameModel: factory(configureGameModel),
    PlayerModel: factory(configurePlayerModel),
    PlayerAnswerModel: factory(configurePlayerAnswerModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addKahootDefinitions(container);
  return container;
};
