import { Test, TestingModule } from '@nestjs/testing';
import { WalletHistoryController } from './wallet-history.controller';

describe('WalletHistoryController', () => {
  let controller: WalletHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletHistoryController],
    }).compile();

    controller = module.get<WalletHistoryController>(WalletHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
