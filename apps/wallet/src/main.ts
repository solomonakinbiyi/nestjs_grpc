import { NestFactory } from '@nestjs/core';
import { WalletModule } from './wallet.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WALLET_PACKAGE_NAME } from '@app/common/types/wallet';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    WalletModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../wallet.proto'),
        package: WALLET_PACKAGE_NAME,
      },
    },
  );
  await app.listen();
}
bootstrap();
