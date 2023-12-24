import { IToken } from './IToken';
import { Role } from './User';

export interface ILoginService {
  status: number;
  data: IToken;
}

export interface IUserWithRole {
  status: number;
  data: Role;
}
