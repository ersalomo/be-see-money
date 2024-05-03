import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { WalletHistoryService } from './wallet-history.service';
import { ApiTags } from '@nestjs/swagger';
import SuccessResponse from 'src/responses/SuccessResponse';
import { WalletHistory } from '@prisma/client';

@ApiTags('Wallet History')
@Controller('/api/wallet-histories')
export class WalletHistoryController {
  constructor(private walletHistService: WalletHistoryService) {}

  @Get()
  async getAll(): Promise<SuccessResponse<WalletHistory[]>> {
    const wHistories = await this.walletHistService.getAll();
    return new SuccessResponse(wHistories, '200');
  }

  @Post()
  async create(): Promise<SuccessResponse<WalletHistory>> {
    return new SuccessResponse();
  }

  @Put()
  async update(): Promise<SuccessResponse<WalletHistory>> {
    return new SuccessResponse();
  }

  @Delete()
  async delete(): Promise<SuccessResponse<string>> {
    return new SuccessResponse();
  }
}
