import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}

  async find(id: string): Promise<User> {
    return this._prismaService.user.findFirst({
      where: { id },
    });
  }

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return this._prismaService.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.find(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    console.log(updateUserDto);
    return await this._prismaService.user.update({
      where: { id },
      data: {},
    });
  }

  async remove(id: string): Promise<void> {
    await this._prismaService.user.delete({
      where: { id },
    });
  }
}
