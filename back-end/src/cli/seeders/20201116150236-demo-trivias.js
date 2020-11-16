module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Trivias', [
      {
        name: 'trivia1',
      },
      {
        name: 'trivia2',
      },
    ]);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Trivias', null, {});
  },
};
