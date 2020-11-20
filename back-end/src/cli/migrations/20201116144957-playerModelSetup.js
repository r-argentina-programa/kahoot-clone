module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */

  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Players', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      fk_game: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        refererences: {
          model: {
            tableName: 'Games',
          },
          key: 'id',
        },
      },
      name: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      session_id: {
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
    return queryInterface.dropTable('Players');
  },
};
