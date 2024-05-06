import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    if (token) {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: req.user.id,
        },
      });
      if (user) {
        req.user = user;
      }
    }

    next();
  }
}
