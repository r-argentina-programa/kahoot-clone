const { DataTypes, Model } = require('sequelize');

module.exports = class TriviaModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof TriviaModel}
   */

  static setup(sequelizeInstance) {
    TriviaModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Trivia',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'Trivias',
      }
    );
    return TriviaModel;
  }

  static setupAssociations(QuestionModel, GameModel) {
    TriviaModel.hasMany(QuestionModel, { foreignKey: 'fk_trivia' });
    TriviaModel.hasMany(GameModel, { foreignKey: 'fk_trivia' });
  }
};
