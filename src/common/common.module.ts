import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthMiddleware } from 'src/common/auth.middleware';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}
