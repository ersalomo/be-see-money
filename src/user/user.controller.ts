import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import SuccessResponse from '@/responses/SuccessResponse';
import { User } from '@prisma/client';
import { ValidationService } from '@/validation/validation.service';
import { z } from 'zod';
import { Auth } from '@/common/auth.decorator';

@ApiTags('Users')
@Controller('/api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private _validatorServ: ValidationService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccessResponse<User>> {
    const zodSchema = z.object({
      name: z.string().max(25).min(4),
      email: z.string().email(),
      password: z.string().max(25).min(4),
      username: z.string().max(25).min(4),
    });
    this._validatorServ.validate(zodSchema, createUserDto);
    const user = await this.userService.create(createUserDto);
    return new SuccessResponse(user, '201');
  }

  @Get()
  async findAll(@Auth() userId: string): Promise<SuccessResponse<User[]>> {
    console.log('find all', userId);
    const users = await this.userService.findAll();
    return new SuccessResponse(users, '200');
  }

  @ApiBearerAuth()
  @Get('/me')
  async me(@Auth() userId: string): Promise<SuccessResponse<User>> {
    const user = await this.userService.findOne(userId);
    delete user.password;
    delete user.token;
    delete user.isDeleted;
    delete user.email;
    return new SuccessResponse(user, '200');
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SuccessResponse<User>> {
    const user = await this.userService.findOne(id);
    return new SuccessResponse(user, '200');
  }

  @ApiBearerAuth()
  @Patch('/update-me')
  async update(
    @Auth() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SuccessResponse<User>> {
    const user = await this.userService.update(userId, updateUserDto);
    return new SuccessResponse(user, '200');
  }

  @ApiBearerAuth()
  @Delete()
  async remove(@Auth() userId: string): Promise<SuccessResponse<string>> {
    await this.userService.remove(userId);
    return new SuccessResponse('', '200');
  }
}
