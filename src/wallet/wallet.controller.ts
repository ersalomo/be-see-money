import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import SuccessResponse from 'src/responses/SuccessResponse';
import { Wallet } from '@prisma/client';
import { WalletReq } from 'src/models/models';
import { ValidationService } from 'src/validation/validation.service';
import { z } from 'zod';
import { ValidationFilter } from 'src/validation/validation.filter';

@ApiTags('Wallet')
@ApiBearerAuth()
@Controller('/api/wallets')
export class WalletController {
  constructor(
    private walletService: WalletService,
    private validationService: ValidationService,
  ) {}

  @Get()
  async getAll(): Promise<SuccessResponse<Wallet[]>> {
    const wallets = await this.walletService.findAll();
    return new SuccessResponse(wallets, 'success');
  }

  @Post()
  @ApiOperation({ summary: 'see' })
  @UseFilters(ValidationFilter)
  async create(@Body() walletReq: WalletReq): Promise<SuccessResponse<Wallet>> {
    const zodSchema = z.object({
      userId: z.string(),
      walletName: z.string(),
      currency: z.string(),
      balance: z.number(),
      desc: z.string(),
      totalIncome: z.number(),
      totalOutcome: z.number(),
    });
    this.validationService.validate(zodSchema, walletReq);
    const w = await this.walletService.save(walletReq);
    return new SuccessResponse(w, 'Data berhasil ditambah');
  }

  @Put()
  async update(): Promise<SuccessResponse<Wallet>> {
    return new SuccessResponse();
  }

  @Delete()
  async delete(): Promise<SuccessResponse<string>> {
    return new SuccessResponse();
  }
}
