import { NextFunction, Request, Response } from 'express';

export default interface IController {
  getAll(req:Request, res: Response, next: NextFunction): Promise<Response | void>;
  getById(req:Request, res: Response, next: NextFunction): Promise<Response | void>;
}
