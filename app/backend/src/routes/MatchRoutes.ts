import { Request, Router, Response } from 'express';
import ValidationMatch from '../middlewares/matchValidation';
import MatchController from '../controllers/MatchControllers';
import ValidationToken from '../middlewares/token.middleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatces(req, res));

router.patch('/:id/finish', ValidationToken.validateLogin, (req: Request, res: Response) =>
  matchController.updateMatchFinish(req, res));

router.patch('/:id', ValidationToken.validateLogin, (req: Request, res: Response) =>
  matchController.upDateMatch(req, res));

router.post(
  '/',
  ValidationToken.validateLogin,
  ValidationMatch.validateMatch,
  (req: Request, res: Response) =>
    matchController.createMath(req, res),
);
export default router;
