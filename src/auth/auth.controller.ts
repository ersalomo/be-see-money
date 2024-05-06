import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import SuccessResponse from '@/responses/SuccessResponse';
import { LoginReq, LoginRes } from '@/models/models';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async create(@Body() req: LoginReq): Promise<SuccessResponse<LoginRes>> {
    const res = await this.authService.login(req);
    return new SuccessResponse(res, 'success');
  }
}
