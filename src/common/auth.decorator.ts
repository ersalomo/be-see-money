import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const { user } = req;
    if (user) return user;
    throw new HttpException('Unauthorized', 401);
  },
);
