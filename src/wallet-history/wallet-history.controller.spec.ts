import { Test, TestingModule } from '@nestjs/testing';
import { WalletHistoryController } from './wallet-history.controller';
import { PrismaModule } from "@/prisma/prisma.module";
import { WalletHistoryService } from "@/wallet-history/wallet-history.service";

describe('WalletHistoryController', () => {
  let controller: WalletHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [WalletHistoryController],
      providers: [WalletHistoryService],
      exports: [WalletHistoryService],
    }).compile();

    controller = module.get<WalletHistoryController>(WalletHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
