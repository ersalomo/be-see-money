import { DynamicModule, Module } from '@nestjs/common';
import { StorageService } from './storage.service';

// @Global()
@Module({
  // imports: [],
  // controllers: [],
  // providers: [StorageService],
  // exports: [StorageService],
})
export class StorageModule {
  static forRoot(isGlobal: boolean = true): DynamicModule {
    return {
      module: StorageModule,
      global: isGlobal,
      providers: [
        // StorageService
        {
          provide: StorageService,
          useValue: new StorageService('public/images'),
        },
      ],
      exports: [StorageService],
    };
  }
}
