import IMatch from '../../Interfaces/Match';
import SequelizeMatch from './SequelizeMatch';
import SequelizeTeam from './SequelizeTeam';
import { IMatchModel, UpdateMatchGoals, MatchCreate } from '../../Interfaces/IMatchModel';

export default class MatchesModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findFilterInProgress(status: boolean): Promise<IMatch[]> {
    const response = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: {
        inProgress: status,
      },
    });
    return response;
  }

  async updateMatchFinish(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, body: UpdateMatchGoals): Promise<void> {
    await this.model.update(body, { where: { id } });
  }

  async createMatch(newMatch: MatchCreate): Promise<IMatch> {
    const response = await this.model.create({ ...newMatch, inProgress: true });
    return response;
  }

  public async getHomeMatches(id: number): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { homeTeamId: id, inProgress: false },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const matchesData = matches.map((match) => match.dataValues);
    return matchesData;
  }

  public async getAwayMatches(id: number): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { awayTeamId: id, inProgress: false },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const matchesData = matches.map((match) => match.dataValues);
    return matchesData;
  }
}
