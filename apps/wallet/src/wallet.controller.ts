import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  CreateWalletDto,
  FindOneWalletDto,
  UpdateWalletDto,
  Wallet,
  Wallets,
  WalletServiceController,
} from '@app/common/types/wallet';
import { Observable } from 'rxjs';

@Controller()
export class WalletController implements WalletServiceController {
  constructor(private readonly walletService: WalletService) {}
  createWallet(
    request: CreateWalletDto,
  ): Wallet | Observable<Wallet> | Promise<Wallet> {
    return this.walletService.createWallet(request);
  }
  async findAllWallets(): Promise<Wallets> {
    const wallets = await this.walletService.findAllWallets();
    return { wallets };
  }
  findOneWallet(
    request: FindOneWalletDto,
  ): Wallet | Observable<Wallet> | Promise<Wallet> {
    return this.walletService.findOneWallet(request);
  }
  updateWallet(
    request: UpdateWalletDto,
  ): Wallet | Observable<Wallet> | Promise<Wallet> {
    return this.walletService.updateWallet(request.id, request);
  }
  async removeWallet(request: FindOneWalletDto): Promise<Wallet> {
    const wallet = await this.walletService.findOneWallet(request);
    await this.walletService.removeWallet(request.id);
    return wallet;
  }
}
