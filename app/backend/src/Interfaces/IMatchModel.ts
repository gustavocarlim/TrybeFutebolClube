import IMatch from './Match';

export type UpdateMatchGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type MatchCreate = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findFilterInProgress(status: boolean): Promise<IMatch[]>,
  updateMatchFinish(id: number): Promise<void>,
  updateMatch(id: number, body: UpdateMatchGoals): Promise<void>,
  createMatch(newMatch: MatchCreate): Promise<IMatch>,
  getAwayMatches(id: number): Promise<IMatch[] | null>;
  getHomeMatches(id: number): Promise<IMatch[] | null>;
}
