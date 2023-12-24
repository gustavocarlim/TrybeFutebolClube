import { ILogin } from './ILogin';

import { Role } from './User';

export interface ILoginModel {
  verifyUser(credentials: ILogin): Promise<string | null>
  getRole(email: string): Promise<Role | null>
}
