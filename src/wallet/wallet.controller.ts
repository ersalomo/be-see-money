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
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WalletService } from './wallet.service';
import SuccessResponse from 'src/responses/SuccessResponse';
import { Wallet } from '@prisma/client';
import { UpdateWalletReq, WalletReq } from 'src/models/models';
import { ValidationService } from 'src/validation/validation.service';
import { z } from 'zod';
import { ValidationFilter } from 'src/validation/validation.filter';
import { Auth } from '@/common/auth.decorator';

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

  @Get(':id')
  async get(
    @Auth() userId: string,
    @Param(':id') id: string,
  ): Promise<SuccessResponse<Wallet>> {
    const wallets = await this.walletService.find(id, userId);
    return new SuccessResponse(wallets, 'success');
  }

  @Delete(':walletId')
  async delete(
    @Auth() userId: string,
    @Param(':walletId') walletId: string,
  ): Promise<SuccessResponse<string>> {
    console.log(walletId, userId);
    await this.walletService.delete(walletId, userId);
    return new SuccessResponse('', 'wallet deleted');
  }

  @Post()
  @ApiOperation({ summary: 'see' })
  @UseFilters(ValidationFilter)
  async create(
    @Auth() userId: string,
    @Body() walletReq: WalletReq,
  ): Promise<SuccessResponse<Wallet>> {
    const zodSchema = z.object({
      walletName: z.string(),
      desc: z.string(),
    });
    this.validationService.validate(zodSchema, walletReq);
    const w = await this.walletService.save(userId, walletReq);
    return new SuccessResponse(w, 'Data berhasil ditambah');
  }

  @Put(':id')
  async update(
    @Param(':id') id: string,
    @Body() req: WalletReq,
  ): Promise<SuccessResponse<Wallet>> {
    console.log(id, req);
    return new SuccessResponse();
  }

  @Patch('/update-balance/:id')
  async updateBalance(
    @Auth() userId: string,
    @Param('id') id: string,
    @Body() req: UpdateWalletReq,
  ): Promise<SuccessResponse<Wallet>> {
    const updateReq = {
      walletId: id,
      owner: userId,
      type: req.type,
      balance: req.balance,
    } as UpdateWalletReq;
    const wallet = await this.walletService.updateBalance(updateReq);
    return new SuccessResponse(wallet, 'update balance success');
  }
}
