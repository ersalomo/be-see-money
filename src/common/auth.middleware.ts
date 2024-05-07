import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(req.headers['authorization']);
    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: { token },
      });
      if (user) {
        req.userId = user.id;
        req.userRole = user.type;
      }
    }
    next();
  }
}
