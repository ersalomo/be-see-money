// import { Wallet } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

// export type WalletReq = Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'>;

export class WalletReq {
  // Properti yang sesuai dengan tipe WalletReq
  @ApiProperty()
  walletName: string;
  @ApiProperty()
  desc?: string;
}

export class UpdateWalletReq {
  @ApiProperty()
  balance: number;
  @ApiProperty()
  type: TransactionType;
  // @ApiProperty()
  walletId?: string;
  // @ApiProperty()
  owner?: string;
}

export class LoginReq {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class LoginRes {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
}

export class CreateCategoryReq {
  @ApiProperty()
  name: string;
}
