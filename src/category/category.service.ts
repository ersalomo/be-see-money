import { PrismaService } from '@/prisma/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { CreateCategoryReq } from '@/models/models';

@Injectable()
export class CategoryService {
  constructor(private _prismaService: PrismaService) {}

  async find(id: number, owner: string) {
    const cat = await this._prismaService.category.findFirst({
      where: {
        id,
        userId: owner,
      },
    });

    if (cat === null) {
      throw new HttpException('category not found', 404);
    }
    return cat;
  }

  async verifyCategoryName(owner: string, name: string) {
    const cat = await this._prismaService.category.findFirst({
      where: {
        name,
        userId: owner,
      },
    });
    if (cat) {
      throw new HttpException('Category already exists', 400);
    }
  }

  async create(userId: string, req: CreateCategoryReq): Promise<Category> {
    req.name = req.name
      .trim()
      .split('')
      .map((l, i) => (i === 0 ? l.toLocaleUpperCase() : l.toLocaleLowerCase()))
      .join('');
    await this.verifyCategoryName(userId, req.name);
    return this._prismaService.category.create({
      data: {
        ...req,
        userId,
      },
    });
  }

  async getAllCategoryByUserId(userId: string): Promise<Category[]> {
    return this._prismaService.category.findMany({
      where: {
        userId,
      },
    });
  }
}
