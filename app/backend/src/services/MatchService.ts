import { ITeamModel } from '../Interfaces/ITeamModel';
import ITeamModell from '../database/models/ITeamModell';
import IMatchModell from '../database/models/IMatchModell';
import IMatch from '../Interfaces/Match';
import { IMatchModel, UpdateMatchGoals, MatchCreate } from '../Interfaces/IMatchModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new IMatchModell(),
    private teamModel: ITeamModel = new ITeamModell(),
  ) { }

  public async getAllMatches(status: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    if (status !== undefined) {
      const inProgress = status === 'true';
      const matches = await this.matchModel.findFilterInProgress(inProgress);
      return { status: 'SUCCESSFUL', data: matches };
    }

    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateMatchFinish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateMatchFinish(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async upDateMatch(id: number, body: UpdateMatchGoals):
  Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateMatch(id, body);
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async createMatch(newMatch: MatchCreate): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = newMatch;

    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const match = await this.matchModel.createMatch(newMatch);
    return { status: 'CREATED', data: match };
  }
}
