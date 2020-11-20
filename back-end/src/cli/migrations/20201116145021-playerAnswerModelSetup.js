module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayerAnswers', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      fk_player: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        refererences: {
          model: {
            tableName: 'Players',
          },
          key: 'id',
        },
      },
      fk_answer: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Answers',
          },
          key: 'id',
        },
      },
      score: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  down: async (queryInterface) => {
    return queryInterface.dropTable('PlayerAnswers');
  },
};
