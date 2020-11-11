const { DataTypes, Model } = require("sequelize");

module.exports = class AnswerModel extends Model {
  /**
   * @param {import('sequelize'.Sequelize)} sequelize
   * @returns {typeof AnswerModel}
   */
  static setup(sequelize) {
    AnswerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        fk_question: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: "Questions",
            },
            key: "id",
          },
        },
        is_correct: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Answer",
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "Answers",
      }
    );
    return AnswerModel;
  }
  static setupAssociations(QuestionModel) {
    QuestionModel.hasMany(AnswerModel, { foreignKey: "fk_question" });
    AnswerModel.belongsTo(QuestionModel, { foreignKey: "fk_question" });
  }
};