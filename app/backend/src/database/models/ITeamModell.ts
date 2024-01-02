import SequelizeTeam from './SequelizeTeam';
import ITeams from '../../Interfaces/teams/ITeams';
import { ITeamModel } from '../../Interfaces/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;
  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: number): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);

    if (!dbData) return null;

    const { teamName } = dbData;
    return { id, teamName };
  }
}
