module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Answers', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      fk_question: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Questions',
          },
          key: 'id',
        },
      },
      is_correct: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  /** @param {import('sequelize').QueryInterface} queryInterface */
  down: async (queryInterface) => {
    return queryInterface.dropTable('Questions');
  },
};
