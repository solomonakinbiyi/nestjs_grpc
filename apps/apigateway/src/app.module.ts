import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [UsersModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
