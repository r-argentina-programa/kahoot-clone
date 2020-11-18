module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */

  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      fk_trivia: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        refererences: {
          model: {
            tableName: 'Trivias',
          },
          key: 'id',
        },
      },
      namespace: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      ongoing: {
        type: Sequelize.DataTypes.BOOLEAN,
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
    return queryInterface.dropTable('Games');
  },
};
