import * as bcrypt from 'bcryptjs';
import { ILogin } from '../../Interfaces/ILogin';
import User from './UserModel';
import { ILoginModel } from '../../Interfaces/ILoginModel';
import JWT from '../../Utils/JWT';
import { Role } from '../../Interfaces/User';

export default class LoginModel implements ILoginModel {
  private model = User;

  public async verifyUser(credentials: ILogin): Promise<string | null> {
    const user = await this.model.findOne({ where: { email: credentials.email } });

    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return null;
    }

    const token = JWT.sign({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    });

    return token;
  }

  public async getRole(email: string): Promise<Role | null> {
    const userExists = await this.model.findOne({ where: { email } });

    if (!userExists) {
      return null;
    }

    return { role: userExists.dataValues.role };
  }
}
