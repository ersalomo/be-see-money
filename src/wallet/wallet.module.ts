import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WalletService } from './wallet.service';

@Module({
  imports: [PrismaModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
