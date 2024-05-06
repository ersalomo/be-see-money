import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';
import { WalletHistoryModule } from './wallet-history/wallet-history.module';
import { CategoryModule } from './category/category.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ExpenseModule } from './expense/expense.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AnalyticModule } from './analytic/analytic.module';
import { CommonModule } from './common/common.module';
import { StorageModule } from './storage/storage.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    WalletModule,
    PrismaModule,
    ValidationModule.forRoot(),
    WalletHistoryModule,
    CategoryModule,
    PaymentMethodModule,
    ExpenseModule,
    UserModule,
    AuthModule,
    AnalyticModule,
    CommonModule,
    StorageModule.forRoot(),
    MulterModule.register({
      dest: '/public/files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public/files'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
