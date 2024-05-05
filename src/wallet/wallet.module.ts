import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletService } from './wallet.service';
import { WalletHistoryModule } from '@/wallet-history/wallet-history.module';

@Module({
  imports: [PrismaModule, WalletHistoryModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
