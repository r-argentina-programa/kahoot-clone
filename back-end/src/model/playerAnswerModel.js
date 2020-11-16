const { DataTypes, Model } = require('sequelize');

module.exports = class PlayerAnswerModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof PlayerAnswerModel}
   */

  static setup(sequelizeInstance) {
    PlayerAnswerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        fk_player: {
          type: DataTypes.INTEGER,
          allowNull: false,
          refererences: {
            model: {
              tableName: 'Players',
            },
            key: 'id',
          },
        },
        fk_answer: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Answers',
            },
            key: 'id',
          },
        },
        score: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'PlayerAnswer',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'PlayerAnswers',
      }
    );
    return PlayerAnswerModel;
  }
};
