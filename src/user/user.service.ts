import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}
  async updateToken(userId: string, accessToken: string): Promise<void> {
    await this._prismaService.user.update({
      where: { id: userId },
      data: {
        token: accessToken,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this._prismaService.user.findFirst({
      where: { username },
    });
  }
  async findByEmail(email: string): Promise<User | null> {
    return this._prismaService.user.findFirst({
      where: { email },
    });
  }

  async find(id: string): Promise<User | null> {
    return this._prismaService.user.findFirst({
      where: { id },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.findByUsername(createUserDto.username);
    if (user) throw new HttpException('Username already exists', 400);
    user = await this.findByEmail(createUserDto.email);
    if (user) throw new HttpException('use another email', 400);
    return this._prismaService.user.create({
      data: createUserDto as User,
    });
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
    await this._prismaService.user.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
