import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { WalletHistoryModule } from '../wallet-history/wallet-history.module';
import { WalletService } from '@/wallet/wallet.service';

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, WalletHistoryModule],
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
