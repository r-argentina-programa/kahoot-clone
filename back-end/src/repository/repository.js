const { fromDbToEntity: fromTriviaDbToEntity } = require('../mapper/triviaMapper');

module.exports = class KahootRepository {
  constructor(AnswerModel, QuestionModel, TriviaModel) {
    this.AnswerModel = AnswerModel;
    this.QuestionModel = QuestionModel;
    this.TriviaModel = TriviaModel;
  }

  async getAllTrivias() {
    const triviasData = await this.TriviaModel.findAll({ attributes: ['id', 'name'] });
    const trivias = triviasData.map((trivia) => fromTriviaDbToEntity(trivia));
    return trivias;
  }

  async getTriviaById(id) {
    const triviaData = await this.TriviaModel.findByPk(id, {
      attributes: ['id', 'name'],
      include: [
        {
          model: this.QuestionModel,
          where: {
            fk_trivia: id,
          },
          attributes: ['id', 'fk_trivia', 'description'],
          include: [
            {
              model: this.AnswerModel,
              attributes: ['id', 'description', 'fk_question', 'is_correct'],
            },
          ],
        },
      ],
    });
    const newTrivia = fromTriviaDbToEntity(triviaData);
    return newTrivia;
  }
};
