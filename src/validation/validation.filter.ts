import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const res = http.getResponse<Response>();

    return res.status(400).json({
      status: 400,
      errors: exception.errors,
    });
  }
}
