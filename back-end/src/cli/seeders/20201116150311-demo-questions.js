module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Questions', [
      {
        fk_trivia: 1,
        description: 'Which is the biggest planet in the Solar System?',
      },
      {
        fk_trivia: 1,
        description: 'Which is the largest animal?',
      },
      {
        fk_trivia: 1,
        description: 'Which is the largest number?',
      },
      {
        fk_trivia: 2,
        description: 'Which is the biggest country?',
      },
      {
        fk_trivia: 2,
        description: 'What is the color of the sky?',
      },
      {
        fk_trivia: 2,
        description: 'Which animal is the fastest?',
      },
    ]);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Questions', null, {});
  },
};
