import IUser from '../Interfaces/User';
import { ILoginService, IUserWithRole } from '../Interfaces/ILoginService';
import { ILogin } from '../Interfaces/ILogin';
import { ILoginModel } from '../Interfaces/ILoginModel';
import LoginModel from '../database/models/LoginModel';

export default class LoginService {
  constructor(
    private loginModel: ILoginModel = new LoginModel(),
  ) { }

  public async login(credentials: ILogin):Promise<ILoginService | null> {
    const token = await this.loginModel.verifyUser(credentials);

    if (!token) {
      return null;
    }

    return { status: 200, data: { token } };
  }

  public async getRole(email: IUser['email']): Promise<IUserWithRole | null> {
    const userExists = await this.loginModel.getRole(email);

    if (!userExists) {
      return null;
    }

    return { status: 200, data: userExists };
  }
}
