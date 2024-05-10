import { Module } from '@nestjs/common';
import { WalletHistoryService } from './wallet-history.service';
import { WalletHistoryController } from './wallet-history.controller';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WalletHistoryController],
  providers: [WalletHistoryService],
  exports: [WalletHistoryService],
})
export class WalletHistoryModule {}
