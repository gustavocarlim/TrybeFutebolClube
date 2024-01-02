import ITeams from './teams/ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeams[]>,
  findById(id: number): Promise<ITeams | null>,
}
