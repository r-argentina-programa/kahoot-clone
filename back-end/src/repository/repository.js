module.exports = class KahootRepository {
  constructor(AnswerModel, QuestionModel, TriviaModel) {
    this.AnswerModel = AnswerModel;
    this.QuestionModel = QuestionModel;
    this.TriviaModel = TriviaModel;
  }

  async getAllTrivias() {
    const triviasData = await this.TriviaModel.findAll({ attributes: ['id', 'name'] });
    return triviasData.map((triviaData) => triviaData.toJSON());
  }

  async getTriviaById(id) {
    const triviaData = await this.TriviaModel.findByPk(id, {
      attributes: ['name'],
      include: [
        {
          model: this.QuestionModel,
          where: {
            fk_trivia: id,
          },
          attributes: ['description'],
          include: [
            {
              model: this.AnswerModel,
              attributes: ['id', 'description', 'is_correct'],
            },
          ],
        },
      ],
    });

    return triviaData.toJSON();
  }
};
