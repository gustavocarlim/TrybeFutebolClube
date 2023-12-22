import { ModelStatic } from 'sequelize';
import IService from '../Interfaces/Service';
import ITeam from '../Interfaces/Team';
import Team from '../database/models/TeamModel';
import ErrorHTTP from '../Interfaces/ErrorHTTP';
import HTTPCodes from '../Interfaces/HTTPCodes';

class TeamService implements IService<ITeam> {
  protected model: ModelStatic<Team> = Team;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll({ order: [['id', 'ASC']], raw: true });
    return teams;
  }

  async getById(id: number): Promise<ITeam> {
    const team = await this.model.findByPk(id, { raw: true });
    if (!team) throw new ErrorHTTP(HTTPCodes.NOT_FOUND, 'Team not found');
    return team;
  }
}

export default TeamService;
