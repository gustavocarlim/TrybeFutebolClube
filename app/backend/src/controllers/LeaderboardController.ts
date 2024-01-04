import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';

class LeaderBoardController {
  private leaderService: LeaderBoardService;
  constructor() {
    this.leaderService = new LeaderBoardService();
  }

  public async findAllHome(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderService.findAllHome();
    return res.status(200).json(result.data);
  }

  public async findAllAway(req: Request, res: Response): Promise<Response> {
    const result = await this.leaderService.findAllAway();
    return res.status(200).json(result.data);
  }
}

export default LeaderBoardController;
