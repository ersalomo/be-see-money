import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginReq } from '@/models/models';

@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService) {}

  async login(req: LoginReq): Promise<any> {}
  async register(): Promise<any> {}
  async logout(): Promise<any> {}
}
