const { DataTypes, Model } = require('sequelize');

module.exports = class QuestionModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof QuestionModel}
   */

  static setup(sequelizeInstance) {
    QuestionModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        fk_trivia: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Trivias',
            },
            key: 'id',
          },
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Question',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'Questions',
      }
    );
    return QuestionModel;
  }

  static setupAssociations(TriviaModel) {
    QuestionModel.belongsTo(TriviaModel, { foreignKey: 'fk_trivia', as: 'Trivia' });
  }
};
