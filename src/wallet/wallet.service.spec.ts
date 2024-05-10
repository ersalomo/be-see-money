import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { WalletController } from '@/wallet/wallet.controller';

import { WalletHistoryModule } from '../wallet-history/wallet-history.module';

describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, WalletHistoryModule],
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
