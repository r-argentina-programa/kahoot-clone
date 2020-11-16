const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const { KahootController, KahootService, KahootRepository } = require('../module');
const AnswerModel = require('../model/answerModel');
const QuestionModel = require('../model/questionModel');
const TriviaModel = require('../model/triviaModel');

function configureMainDatabaseAdapter() {
  return new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureMainDatabaseAdapter),
  });
}

/**
 * @param {DIContainer} container
 */
function configureAnswerModel(container) {
  return AnswerModel.setup(container.get('Sequelize'));
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
  TriviaModel.setupAssociations(container.get('QuestionModel'));
  return TriviaModel;
}

/**
 * @param {DIContainer} container
 */
function addKahootDefinitions(container) {
  container.addDefinitions({
    KahootController: object(KahootController).construct(get('KahootService')),
    KahootService: object(KahootService).construct(get('KahootRepository')),
    KahootRepository: object(KahootRepository).construct(
      get('AnswerModel'),
      get('QuestionModel'),
      get('TriviaModel')
    ),
    AnswerModel: factory(configureAnswerModel),
    QuestionModel: factory(configureQuestionModel),
    TriviaModel: factory(configureTriviaModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addKahootDefinitions(container);
  return container;
};
