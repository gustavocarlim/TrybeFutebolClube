import { Request, Response, NextFunction } from 'express';
import IController from '../Interfaces/Controller';
import IService from '../Interfaces/Service';
import ITeam from '../Interfaces/Team';
import HTTPCodes from '../Interfaces/HTTPCodes';

class TeamController implements IController {
  private _service: IService<ITeam>;

  constructor(service: IService<ITeam>) {
    this._service = service;
  }

  async getAll(_req:Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const teams = await this._service.getAll();
    return res.status(HTTPCodes.OK).json(teams);
  }

  async getById(req:Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const { id } = req.params;
    const team = await this._service.getById(Number(id));
    return res.status(HTTPCodes.OK).json(team);
  }
}

export default TeamController;
