import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ValidationModule } from '@/validation/validation.module';

@Module({
  imports: [ValidationModule],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
