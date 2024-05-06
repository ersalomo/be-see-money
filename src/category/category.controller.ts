import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';
import { Category } from '@prisma/client';
import SuccessResponse from 'src/responses/SuccessResponse';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '@/common/auth.decorator';
import { CreateCategoryReq } from '@/models/models';
import { z } from 'zod';
import { ValidationService } from '@/validation/validation.service';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('/api/categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private _validatorServ: ValidationService,
  ) {}
  @Get()
  async getAll(@Auth() userId: string): Promise<SuccessResponse<Category[]>> {
    const categories =
      await this.categoryService.getAllCategoryByUserId(userId);
    return new SuccessResponse(categories, 'success');
  }

  @Post()
  async create(
    @Auth() userId: string,
    @Body() req: CreateCategoryReq,
  ): Promise<SuccessResponse<Category>> {
    const zodSchema = z.object({
      name: z.string().max(25).min(4),
    });
    this._validatorServ.validate(zodSchema, req);
    const cat = await this.categoryService.create(userId, req);
    return new SuccessResponse(cat, 'success');
  }

  @Put()
  async update(@Auth() userId: string): Promise<SuccessResponse<Category>> {
    return new SuccessResponse();
  }

  @Delete()
  async delete(@Auth() userId: string): Promise<SuccessResponse<string>> {
    return new SuccessResponse();
  }
}
