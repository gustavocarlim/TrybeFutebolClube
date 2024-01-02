import { Request, Response } from 'express';
import { UpdateMatchGoals } from '../Interfaces/IMatchModel';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatces(req: Request, res: Response) {
    const { inProgress } = req.query;
    const progress = typeof inProgress === 'string' ? inProgress : undefined;
    const serviceResponse = await this.matchService.getAllMatches(progress);
    res.status(200).json(serviceResponse.data);
  }

  public async updateMatchFinish(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchService.updateMatchFinish(Number(id));
    return res.status(200).json(serviceResponse.data);
  }

  public async upDateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match: UpdateMatchGoals = req.body;
    const serviceResponse = await this.matchService.upDateMatch(Number(id), match);
    return res.status(200).json(serviceResponse.data);
  }

  public async createMath(req: Request, res: Response) {
    const newMatch = req.body;
    const serviceResponse = await this.matchService.createMatch(newMatch);

    if (serviceResponse.status !== 'CREATED') {
      return res.status(404).json(serviceResponse.data);
    }

    res.status(201).json(serviceResponse.data);
  }
}
