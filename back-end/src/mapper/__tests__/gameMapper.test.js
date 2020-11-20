const { fromDataToEntity, fromDbToEntity } = require('../gameMapper');
const Game = require('../../entity/game');

describe('fromDataToEntity', () => {
  test('It maps form data into an entity', () => {
    const dataMock = {
      id: '1',
      triviaId: '1',
      namespace: 'someNamespace',
      ongoing: true,
    };

    const game = fromDataToEntity(dataMock);

    expect(game).toBeInstanceOf(Game);
  });
});

describe('fromDbToEntity', () => {
  test('It maps data base data into an entity', () => {
    const modelInstanceMock = {
      toJSON: jest.fn(),
    };

    modelInstanceMock.toJSON.mockReturnValueOnce({});

    const game = fromDbToEntity(modelInstanceMock);

    expect(game).toBeInstanceOf(Game);
  });
});
