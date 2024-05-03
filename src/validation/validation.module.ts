import { DynamicModule, Module } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Module({})
export class ValidationModule {
  static forRoot(isGlobal: boolean = true): DynamicModule {
    return {
      module: ValidationModule,
      global: isGlobal,
      providers: [ValidationService],
      exports: [ValidationService],
    };
  }
}
