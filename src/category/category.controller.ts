import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Category } from '@prisma/client';
import SuccessResponse from 'src/responses/SuccessResponse';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('/api/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getAll(): Promise<SuccessResponse<Category[]>> {
    return new SuccessResponse();
  }

  @Post()
  async create(): Promise<SuccessResponse<Category>> {
    return new SuccessResponse();
  }

  @Put()
  async update(): Promise<SuccessResponse<Category>> {
    return new SuccessResponse();
  }

  @Delete()
  async delete(): Promise<SuccessResponse<string>> {
    return new SuccessResponse();
  }
}
