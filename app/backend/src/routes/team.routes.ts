import { NextFunction, Request, Response, Router } from 'express';
import TeamController from '../controllers/team.controller';
import TeamService from '../services/team.service';

const ServiceBase = new TeamService();
const ControllerBase = new TeamController(ServiceBase);
const Route = Router();

Route.use('/:id', (req: Request, res: Response, next: NextFunction) =>
  ControllerBase.getById(req, res, next));

Route.use('/', (req: Request, res: Response, next: NextFunction) =>
  ControllerBase.getAll(req, res, next));

export default Route;
