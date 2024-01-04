import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderBoardRouter = Router();
const leaderController = new LeaderBoardController();
leaderBoardRouter.get(
  '/home',
  async (req: Request, res: Response) => {
    const performance = await leaderController.findAllHome(req, res);
    res.json(performance);
  },
);

leaderBoardRouter.get(
  '/away',
  async (req: Request, res: Response) => {
    const performance = await leaderController.findAllAway(req, res);
    res.json(performance);
  },
);

export default leaderBoardRouter;
