const { fromDataToEntity, fromDbToEntity } = require('../triviaMapper');
const Trivia = require('../../entity/trivia');

describe('fromDataToEntity', () => {
  test('It maps form data into an entity', () => {
    const dataMock = {
      id: '1',
      name: 'trivia1',
      questions: ['question1', 'question2', 'question3'],
    };

    const trivia = fromDataToEntity(dataMock);

    expect(trivia).toBeInstanceOf(Trivia);
  });
});

describe('fromDbToEntity', () => {
  test('It maps data base data into an entity', () => {
    const modelInstanceMock = {
      toJSON: jest.fn(),
    };

    modelInstanceMock.toJSON.mockReturnValueOnce({});

    const trivia = fromDbToEntity(modelInstanceMock);

    expect(trivia).toBeInstanceOf(Trivia);
  });
});
