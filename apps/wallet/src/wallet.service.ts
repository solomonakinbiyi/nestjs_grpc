import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/Wallet';
import { Repository } from 'typeorm';
import {
  CreateWalletDto,
  FindOneWalletDto,
  UpdateWalletDto,
} from '@app/common/types/wallet';
import { Observable } from 'rxjs';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
  ) {}

  createWallet(
    createWalletDto: CreateWalletDto,
  ): Wallet | Observable<Wallet> | Promise<Wallet> {
    const data = this.walletRepository.create(createWalletDto);

    return this.walletRepository.save(data);
  }
  findAllWallets(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }
  findOneWallet(request: FindOneWalletDto): Promise<Wallet> {
    return this.walletRepository.findOneBy({ id: request.id });
  }
  async updateWallet(
    id: string,
    updateWalletDto: UpdateWalletDto,
  ): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneBy({ id });
    if (!wallet) {
      throw new NotFoundException(`Wallet with id "${id}" not found`);
    }
    const updatedWallet = await this.walletRepository.update(
      id,
      updateWalletDto,
    );
    return updatedWallet.raw;
  }
  removeWallet(id: string) {
    return this.walletRepository.delete(id);
  }
}
