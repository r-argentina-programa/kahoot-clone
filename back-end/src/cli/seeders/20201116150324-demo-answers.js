module.exports = {
  /** @param {import('sequelize').QueryInterface} queryInterface */
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('Answers', [
      {
        description: 'Venus',
        fk_question: 1,
        is_correct: false,
      },
      {
        description: 'JUPITER',
        fk_question: 1,
        is_correct: true,
      },
      {
        description: 'Mars',
        fk_question: 1,
        is_correct: false,
      },
      {
        description: 'Cow',
        fk_question: 2,
        is_correct: false,
      },
      {
        description: 'Dog',
        fk_question: 2,
        is_correct: false,
      },
      {
        description: 'Mosquito',
        fk_question: 2,
        is_correct: false,
      },
      {
        description: 'WHALE',
        fk_question: 2,
        is_correct: true,
      },
      {
        description: '1',
        fk_question: 3,
        is_correct: false,
      },
      {
        description: '2',
        fk_question: 3,
        is_correct: false,
      },
      {
        description: '1000000',
        fk_question: 3,
        is_correct: true,
      },
      {
        description: 'Uruguay',
        fk_question: 4,
        is_correct: false,
      },
      {
        description: 'BRAZIL',
        fk_question: 4,
        is_correct: true,
      },
      {
        description: 'Paraguay',
        fk_question: 4,
        is_correct: false,
      },
      {
        description: 'Peru',
        fk_question: 4,
        is_correct: false,
      },
      {
        description: 'Yellow',
        fk_question: 5,
        is_correct: false,
      },
      {
        description: 'Green',
        fk_question: 5,
        is_correct: false,
      },
      {
        description: 'BLUE',
        fk_question: 5,
        is_correct: true,
      },
      {
        description: 'Pink',
        fk_question: 5,
        is_correct: false,
      },
      {
        description: 'CHEETAH',
        fk_question: 6,
        is_correct: true,
      },
      {
        description: 'Turtle',
        fk_question: 6,
        is_correct: false,
      },
      {
        description: 'Sloth',
        fk_question: 6,
        is_correct: false,
      },
      {
        description: 'Dog',
        fk_question: 6,
        is_correct: false,
      },
    ]);
  },

  /** @param {import('sequelize').QueryInterface} queryInterface */
  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Answers', null, {});
  },
};
