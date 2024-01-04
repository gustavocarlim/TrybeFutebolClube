import MatchesModel from '../database/models/IMatchModell';
import TeamModel from '../database/models/ITeamModell';
import { ILeaderBoardService } from '../Interfaces/ILeaderboard';
import { calculateWinPoints, sortLeaderBoardResults } from '../Utils/handleLeaderBoard';
import IMatches from '../Interfaces/Match';

class LeaderBoardService {
  private matchesModel: MatchesModel;
  private teamsModel: TeamModel;
  private static initialLeader: ILeaderBoardService = {
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0.00,
  };

  constructor() {
    this.matchesModel = new MatchesModel();
    this.teamsModel = new TeamModel();
  }

  public async findAllHome() {
    const getAllTeams = await this.teamsModel.findAll();
    const getAllHome = await Promise.all(getAllTeams.map(async (team) => {
      const homeMatches = await this.matchesModel.getHomeMatches(team.id);
      const calculatePoints = LeaderBoardService.calculateTeamPoints(homeMatches);
      return { name: team.teamName, ...calculatePoints };
    }));
    const sortedResults = sortLeaderBoardResults(getAllHome);
    return {
      status: 'SUCCESSFUL',
      data: sortedResults,
    };
  }

  public async findAllAway() {
    const getAllTeams = await this.teamsModel.findAll();
    const getAllAway = await Promise.all(getAllTeams.map(async (team) => {
      const awayMatches = await this.matchesModel.getAwayMatches(team.id);
      const calculatePoints = LeaderBoardService.calculateTeamPoints(awayMatches);
      return { name: team.teamName, ...calculatePoints };
    }));
    const sortedResults = sortLeaderBoardResults(getAllAway);
    return {
      status: 'SUCCESSFUL',
      data: sortedResults,
    };
  }

  private static calculateTeamPoints(teams: IMatches[]): ILeaderBoardService {
    return teams.reduce((acc, team) => {
      const { homeTeamGoals, awayTeamGoals } = team;
      const calculatePoints = calculateWinPoints(homeTeamGoals, awayTeamGoals);
      return {
        ...acc,
        totalPoints: acc.totalPoints + calculatePoints,
        totalGames: acc.totalGames + 1,
        totalVictories: acc.totalVictories + (calculatePoints === 3 ? 1 : 0),
        totalDraws: acc.totalDraws + (calculatePoints === 1 ? 1 : 0),
        totalLosses: acc.totalLosses + (calculatePoints === 0 ? 1 : 0),
        goalsFavor: acc.goalsFavor + homeTeamGoals,
        goalsOwn: acc.goalsOwn + awayTeamGoals,
        goalsBalance: acc.goalsBalance + (homeTeamGoals - awayTeamGoals),
        efficiency: Number((((acc.totalPoints + calculatePoints)
          / ((acc.totalGames + 1) * 3))
          * 100).toFixed(2)),
      };
    }, this.initialLeader);
  }
}
export default LeaderBoardService;
