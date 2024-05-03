import { Injectable } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { WalletReq } from 'src/models/models';

export interface WalletRepostory {
  find(id: string | number): Promise<Wallet | null>;
  findAll(): Promise<Wallet[]>;
  delete(id: string | number): Promise<Wallet | null>;
  update(walletReq: WalletReq): Promise<Wallet | null>;
}
