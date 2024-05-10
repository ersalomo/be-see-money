import { Test, TestingModule } from '@nestjs/testing';
import { WalletHistoryService } from './wallet-history.service';
import { PrismaModule } from "@/prisma/prisma.module";
import { WalletHistoryController } from "@/wallet-history/wallet-history.controller";

describe('WalletHistoryService', () => {
  let service: WalletHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [WalletHistoryController],
      providers: [WalletHistoryService],
      exports: [WalletHistoryService],
    }).compile();

    service = module.get<WalletHistoryService>(WalletHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
