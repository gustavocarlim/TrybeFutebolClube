import ILeader, { ILeaderBoardService } from '../Interfaces/ILeaderboard';

function calculateWinPoints(homeTeam: number, awayTeam: number): number {
  if (homeTeam > awayTeam) return 3;
  if (homeTeam === awayTeam) return 1;
  return 0;
}
function sortLeaderBoardResults(results: ILeaderBoardService[]): ILeaderBoardService[] {
  return results.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (b.totalVictories !== a.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }
    if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
}

function calculateTotal(homeTeam: ILeaderBoardService, awayTeam: ILeaderBoardService):
ILeaderBoardService {
  const total: ILeader = {} as ILeader;

  total.totalPoints = homeTeam.totalPoints + awayTeam.totalPoints;
  total.totalGames = homeTeam.totalGames + awayTeam.totalGames;
  total.totalVictories = homeTeam.totalVictories + awayTeam.totalVictories;
  total.totalDraws = homeTeam.totalDraws + awayTeam.totalDraws;
  total.totalLosses = homeTeam.totalLosses + awayTeam.totalLosses;
  total.goalsFavor = homeTeam.goalsFavor + awayTeam.goalsFavor;
  total.goalsOwn = homeTeam.goalsOwn + awayTeam.goalsOwn;
  total.goalsBalance = homeTeam.goalsBalance + awayTeam.goalsBalance;
  const totalGames = total.totalGames + total.totalGames;
  const totalPoints = total.totalPoints + total.totalPoints;
  total.efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return total;
}
export { calculateWinPoints, sortLeaderBoardResults, calculateTotal };
