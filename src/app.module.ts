import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';
import { WalletHistoryController } from './wallet-history/wallet-history.controller';
import { WalletHistoryModule } from './wallet-history/wallet-history.module';
import { WalletController } from './wallet/wallet.controller';
import { CategoryModule } from './category/category.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    WalletModule,
    PrismaModule,
    ValidationModule.forRoot(),
    WalletHistoryModule,
    CategoryModule,
    PaymentMethodModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
