import { Get, Injectable } from '@nestjs/common';
import { WalletHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WalletHistoryService {
  constructor(private prismaService: PrismaService) {}

  @Get()
  async getAll(): Promise<WalletHistory[]> {
    return this.prismaService.walletHistory.findMany();
  }
}
