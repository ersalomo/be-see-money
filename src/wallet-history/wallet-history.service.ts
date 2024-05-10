import { Injectable } from '@nestjs/common';
import { WalletHistory } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class WalletHistoryService {
  constructor(private prismaService: PrismaService) {}
  async getAll(): Promise<WalletHistory[]> {
    return this.prismaService.walletHistory.findMany();
  }
  async insert(w: WalletHistory): Promise<WalletHistory> {
    return this.prismaService.walletHistory.create({ data: w });
  }
}
