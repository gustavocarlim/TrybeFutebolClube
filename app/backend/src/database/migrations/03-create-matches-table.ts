import { QueryInterface, DataTypes, Model } from 'sequelize';

interface IMatchMigration {
  id: number,
  home_team_id: number,
  home_team_goals: number,
  away_team_id: number,
  away_team_goals: number,
  in_progress: boolean,
}

export default {
  up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatchMigration>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      home_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      home_team_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      away_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      away_team_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      in_progress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  }
};