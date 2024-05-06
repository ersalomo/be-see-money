import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletReq } from 'src/models/models';
import { Wallet } from '@prisma/client';
import { WalletRepostory } from './wallet.repository';

@Injectable()
export class WalletService implements WalletRepostory {
  constructor(private prismaService: PrismaService) {}
  async find(id: number): Promise<Wallet> {
    const w = await this.prismaService.wallet.findFirst({
      where: { id },
    });
    if (w === null) {
      throw new HttpException('Wallet not found', 404);
    }
    return w;
  }
  async findAll(): Promise<Wallet[]> {
    return this.prismaService.wallet.findMany();
  }
  async delete(id: number): Promise<Wallet> {
    await this.find(id);
    return this.prismaService.wallet.delete({
      where: { id },
    });
  }
  async update(walletReq: WalletReq): Promise<Wallet> {
    return await this.prismaService.wallet.update({
      where: { id: 0 },
      data: walletReq,
    });
  }

  async save(w: WalletReq): Promise<Wallet> {
    return await this.prismaService.wallet.create({
      data: w,
    });
  }
}
