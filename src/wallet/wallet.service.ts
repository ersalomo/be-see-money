import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WalletReq } from 'src/models/models';
import { TransactionType, Wallet } from '@prisma/client';
import { WalletRepostory } from './wallet.repository';
import { WalletHistoryService } from '@/wallet-history/wallet-history.service';
import { WalletHistory } from '@prisma/client';

@Injectable()
export class WalletService implements WalletRepostory {
  constructor(
    private prismaService: PrismaService,
    private walletHistoryService: WalletHistoryService,
  ) {}
  async find(id: number): Promise<Wallet> {
    const user = this.prismaService.wallet.findFirst({
      where: {
        id,
      },
    });
    if (user === null) {
      throw new HttpException('Wallet not found', 404);
    }
    return user;
  }
  async findAll(): Promise<Wallet[]> {
    return this.prismaService.wallet.findMany();
  }
  async delete(id: number): Promise<Wallet> {
    return this.prismaService.wallet.delete({ where: { id } });
  }
  async update(walletReq: WalletReq): Promise<Wallet> {
    console.log(walletReq);
    throw new Error('Method not implemented.');
  }

  // cek user id
  async addBalance(id: number, balance: number): Promise<Wallet> {
    const { totalIncome, balance: currBalance } = await this.find(id);
    const w = await this.prismaService.wallet.update({
      where: { id },
      data: {
        balance: currBalance + balance,
        totalIncome: totalIncome + balance,
        // userId: '42ca5178-ac9c-45d8-a56f-75bd4b2fa570',
      },
    });
    await this.walletHistoryService.insert({
      walletId: w.id,
      amount: balance,
      desc: 'update balance',
      transactionType: TransactionType.INCOME,
      // categoryId: 0,
      // image: '',
      // paymentMethod: '0',
    } as WalletHistory);
    return w;
  }

  async addExpense(id: number, balance: number): Promise<Wallet> {
    const { totalOutcome, balance: currBalance } = await this.find(id);
    const w = await this.prismaService.wallet.update({
      where: { id },
      data: {
        balance: currBalance - balance,
        totalIncome: totalOutcome + balance,
        // userId: '42ca5178-ac9c-45d8-a56f-75bd4b2fa570',
      },
    });
    await this.walletHistoryService.insert({
      walletId: w.id,
      amount: balance,
      desc: 'update balance',
      transactionType: TransactionType.EXPENSE,
      // categoryId: 0,
      // image: '',
      // paymentMethod: '0',
    } as WalletHistory);
    return w;
  }

  async save(w: WalletReq): Promise<Wallet> {
    return await this.prismaService.wallet.create({
      data: {
        ...w,
        userId: '42ca5178-ac9c-45d8-a56f-75bd4b2fa570',
      },
    });
  }
}
