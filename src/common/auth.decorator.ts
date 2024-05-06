import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const { userId } = req;
    console.log('Auth', req.userId);
    if (userId) return userId;
    throw new HttpException('Unauthorized', 403);
  },
);
