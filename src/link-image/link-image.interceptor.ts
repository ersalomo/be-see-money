import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LinkImageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const res = context.switchToHttp().getResponse();
    // console.log(res);
    // const nest = next.handle().pipe((value: any) => {
    //   console.log(value);
    //   value.timestamp = new Date();
    //   return value;
    // });
    // return nest;
    return next.handle();
  }
}
