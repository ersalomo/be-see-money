// import { Wallet } from '@prisma/client';

import { TransactionType } from '@prisma/client';

// export type WalletReq = Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'>;

export class WalletReq {
  // Properti yang sesuai dengan tipe WalletReq
  walletName: string;
  desc?: string;
}

export class UpdateWalletReq {
  balance: number;
  type: TransactionType;
}
