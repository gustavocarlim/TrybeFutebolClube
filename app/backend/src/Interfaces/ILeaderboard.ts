import IMatches from './Match';

interface ILeader {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export type ILeaderBoardService = Omit<ILeader, 'name'>;

export interface ILeaderMatch extends IMatches, ILeader {}

export default ILeader;
