import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginReq, LoginRes } from '@/models/models';
import { UserService } from '@/user/user.service';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private _prismaService: PrismaService,
    private _userService: UserService,
  ) {}

  async login(req: LoginReq): Promise<LoginRes> {
    const user = await this._userService.findByUsername(req.username);
    if (user === null) {
      throw new HttpException('username or password incorrect', 403);
    }

    if (user.password !== req.password) {
      throw new HttpException('username or password incorrect', 403);
    }

    const accessToken = randomUUID();
    const refreshToken = randomUUID();
    await this._userService.updateToken(user.id, accessToken);
    const res = {
      accessToken,
      refreshToken,
    } as LoginRes;
    return res;
  }
  async logout(userId: string): Promise<void> {
    await this._userService.updateToken(userId, '');
  }
}
