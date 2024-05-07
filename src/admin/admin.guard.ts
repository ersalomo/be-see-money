import { PrismaService } from '@/prisma/prisma.service';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
//role
export class AdminGuard implements CanActivate {
  constructor(private roles: number[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = context.switchToHttp().getRequest().userRole;
    console.log('USERRRRR', role, this.roles);
    return this.roles.some((val) => val === role);
  }
}
