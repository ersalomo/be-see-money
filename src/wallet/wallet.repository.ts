import { Wallet } from '@prisma/client';
import { WalletReq } from 'src/models/models';

export interface WalletRepostory {
  find(id: string, owner: string): Promise<Wallet | null>;
  findAll(): Promise<Wallet[]>;
  delete(id: string, owner: string): Promise<Wallet | null>;
  update(walletId: string, walletReq: WalletReq): Promise<Wallet | null>;
}
