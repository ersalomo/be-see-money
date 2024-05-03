import { Wallet } from '@prisma/client';

export type WalletReq = Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'>;
