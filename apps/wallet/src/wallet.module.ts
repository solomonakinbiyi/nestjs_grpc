import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/Wallet';
import { User } from 'apps/auth/src/users/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'authenticate',
      database: 'nestjs_grpc',
      entities: [Wallet, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Wallet, User]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
