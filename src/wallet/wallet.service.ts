import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWalletReq, WalletReq } from 'src/models/models';
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
  async find(id: string, owner: string): Promise<Wallet> {
    console.log('find service', id, owner);
    const w = await this.prismaService.wallet.findFirst({
      where: { id },
    });
    console.log(w);
    if (w === null) {
      throw new HttpException('Wallet not found', 404);
    }
    if (w.isDeleted) {
      throw new HttpException('Wallet not found', 404);
    }
    if (w.userId !== owner) {
      throw new HttpException('Unauthorized', 403);
    }
    return w;
  }

  async findAll(): Promise<Wallet[]> {
    return this.prismaService.wallet.findMany();
  }

  async delete(id: string, owner: string): Promise<Wallet> {
    await this.find(id, owner);
    return await this.prismaService.wallet.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }
  async update(walletId: string, walletReq: WalletReq): Promise<Wallet> {
    return await this.prismaService.wallet.update({
      where: { id: walletId },
      data: walletReq,
    });
  }

  async updateBalance(req: UpdateWalletReq): Promise<Wallet> {
    await this.find(req.walletId, req.owner);
    let wallet: Wallet;
    if (req.type == TransactionType.INCOME) {
      wallet = await this.addBalance(req.walletId, req.balance, req.owner);
    } else if (req.type == TransactionType.EXPENSE) {
      wallet = await this.addExpense(req.walletId, req.balance, req.owner);
    } else {
      throw new HttpException('type is not suitable', 400);
    }
    return wallet;
  }
  // cek user id
  private async addBalance(
    id: string,
    balance: number,
    owner: string,
  ): Promise<Wallet> {
    const { totalIncome, balance: currBalance } = await this.find(id, owner);
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

  private async addExpense(
    id: string,
    balance: number,
    owner: string,
  ): Promise<Wallet> {
    const { totalOutcome, balance: currBalance } = await this.find(id, owner);
    if (balance <= 0) {
      throw new HttpException(`amount must greater than 0`, 400);
    }
    // lain waktu buat saldo minimal 10000
    if (currBalance - balance < 0) {
      throw new HttpException(`You have ${currBalance} left`, 400);
    }

    const w = await this.prismaService.wallet.update({
      where: { id },
      data: {
        balance: currBalance - balance,
        totalOutcome: totalOutcome + balance,
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

  async save(userId: string, w: WalletReq): Promise<Wallet> {
    return await this.prismaService.wallet.create({
      data: {
        ...w,
        userId,
      } as Wallet,
    });
  }
}
