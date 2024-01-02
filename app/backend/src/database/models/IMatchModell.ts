import IMatch from '../../Interfaces/Match';
import SequelizeMatch from './SequelizeMatch';
import SequelizeTeam from './SequelizeTeam';
import { IMatchModel, UpdateMatchGoals, MatchCreate } from '../../Interfaces/IMatchModel';

export default class MatcModel implements IMatchModel {
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
}
