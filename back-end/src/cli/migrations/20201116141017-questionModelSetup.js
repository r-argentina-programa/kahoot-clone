module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      fk_trivia: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Trivias',
          },
          key: 'id',
        },
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
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
    return queryInterface.dropTable('Questions');
  },
};
