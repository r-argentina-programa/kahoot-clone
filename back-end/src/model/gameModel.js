const { DataTypes, Model } = require('sequelize');

module.exports = class GameModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof GameModel}
   */

  static setup(sequelizeInstance) {
    GameModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        fk_trivia: {
          type: DataTypes.INTEGER,
          allowNull: false,
          refererences: {
            model: {
              tableName: 'Trivias',
            },
            key: 'id',
          },
        },
        namespace: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        ongoing: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Game',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'Games',
      }
    );
    return GameModel;
  }

  static setupAssociations(PlayerModel) {
    GameModel.hasMany(PlayerModel, { foreignKey: 'fk_game' });
  }
};
