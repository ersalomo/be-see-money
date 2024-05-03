import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletReq } from 'src/models/models';
import { Wallet } from '@prisma/client';
import { WalletRepostory } from './wallet.repository';

@Injectable()
export class WalletService implements WalletRepostory {
  constructor(private prismaService: PrismaService) {}
  async find(id: string | number): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Wallet[]> {
    return this.prismaService.wallet.findMany();
  }
  async delete(id: string | number): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  async update(walletReq: WalletReq): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }

  async save(w: WalletReq): Promise<Wallet> {
    return await this.prismaService.wallet.create({
      data: w,
    });
  }
}
