import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WALLET_PACKAGE_NAME } from '@app/common/types/wallet';
import { join } from 'path';
import { WALLET_SERVICE } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WALLET_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: WALLET_PACKAGE_NAME,
          protoPath: join(__dirname, '../wallet.proto'),
        },
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
