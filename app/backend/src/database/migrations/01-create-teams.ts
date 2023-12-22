import { DataTypes, Model, QueryInterface } from 'sequelize';
import ITeam from '../../Interfaces/Team';

export default {
  up: async (queryInterface: QueryInterface) => {
    return await queryInterface.createTable<Model<ITeam>>("teams", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name'
      },
    });
  },
  down: async (queryInterface:QueryInterface) => {
    return await queryInterface.dropTable("teams");
  },
};