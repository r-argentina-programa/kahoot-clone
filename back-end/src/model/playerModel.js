const { DataTypes, Model } = require('sequelize');

module.exports = class PlayerModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof PlayerModel}
   */

  static setup(sequelizeInstance) {
    PlayerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        fk_game: {
          type: DataTypes.INTEGER,
          allowNull: false,
          refererences: {
            model: {
              tableName: 'Games',
            },
            key: 'id',
          },
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        session_id: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Player',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'Players',
      }
    );
    return PlayerModel;
  }

  static setupAssociations(PlayerAnswerModel) {
    PlayerModel.hasMany(PlayerAnswerModel, { foreignKey: 'fk_player' });
  }
};
