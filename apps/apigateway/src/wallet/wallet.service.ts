import { Inject, Injectable } from '@nestjs/common';
import {
  CreateWalletDto,
  UpdateWalletDto,
  WALLET_SERVICE_NAME,
  WalletServiceClient,
} from '@app/common/types/wallet';
import { ClientGrpc } from '@nestjs/microservices';
import { WALLET_SERVICE } from './constants';

@Injectable()
export class WalletService {
  private walletService: WalletServiceClient;

  constructor(@Inject(WALLET_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.walletService =
      this.client.getService<WalletServiceClient>(WALLET_SERVICE_NAME);
  }

  create(createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  findAll() {
    return this.walletService.findAllWallets({});
  }

  findOne(id: string) {
    return this.walletService.findOneWallet({ id });
  }

  update(id: string, updateWalletDto: UpdateWalletDto) {
    return this.walletService.updateWallet({ id, ...updateWalletDto });
  }

  remove(id: string) {
    return this.walletService.removeWallet({ id });
  }
}
