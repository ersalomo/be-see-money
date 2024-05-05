import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  Put,
  Delete,
  Patch,
  Param,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import SuccessResponse from 'src/responses/SuccessResponse';
import { TransactionType, Wallet } from '@prisma/client';
import { UpdateWalletReq, WalletReq } from 'src/models/models';
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
      walletName: z.string(),
      desc: z.string(),
    });
    this.validationService.validate(zodSchema, walletReq);
    const w = await this.walletService.save(walletReq);
    return new SuccessResponse(w, 'Data berhasil ditambah');
  }

  @Patch('/update-balance/:id')
  async updateBalance(
    @Param('id') id: string,
    @Body() req: UpdateWalletReq,
  ): Promise<SuccessResponse<Wallet>> {
    console.log(req, req.type == TransactionType.EXPENSE);
    let wallet: Wallet;
    if (req.type == TransactionType.INCOME) {
      wallet = await this.walletService.addBalance(parseInt(id), req.balance);
    } else if (req.type == TransactionType.EXPENSE) {
      wallet = await this.walletService.addExpense(parseInt(id), req.balance);
    } else {
      throw new HttpException('type is not suitable', 400);
    }
    return new SuccessResponse(wallet, 'update balance success');
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
