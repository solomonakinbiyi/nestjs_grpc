/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "wallet";

export interface FindOneWalletDto {
  id: string;
}

export interface UpdateWalletDto {
  id: string;
}

export interface Empty {
}

export interface Wallets {
  wallets: Wallet[];
}

export interface CreateWalletDto {
  userId: string;
  amount: number;
  user: User | undefined;
}

export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Wallet {
  id: string;
  userId: string;
  amount: number;
  user: User | undefined;
}

export const WALLET_PACKAGE_NAME = "wallet";

export interface WalletServiceClient {
  createWallet(request: CreateWalletDto): Observable<Wallet>;

  findAllWallets(request: Empty): Observable<Wallets>;

  findOneWallet(request: FindOneWalletDto): Observable<Wallet>;

  updateWallet(request: UpdateWalletDto): Observable<Wallet>;

  removeWallet(request: FindOneWalletDto): Observable<Wallet>;
}

export interface WalletServiceController {
  createWallet(request: CreateWalletDto): Promise<Wallet> | Observable<Wallet> | Wallet;

  findAllWallets(request: Empty): Promise<Wallets> | Observable<Wallets> | Wallets;

  findOneWallet(request: FindOneWalletDto): Promise<Wallet> | Observable<Wallet> | Wallet;

  updateWallet(request: UpdateWalletDto): Promise<Wallet> | Observable<Wallet> | Wallet;

  removeWallet(request: FindOneWalletDto): Promise<Wallet> | Observable<Wallet> | Wallet;
}

export function WalletServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createWallet", "findAllWallets", "findOneWallet", "updateWallet", "removeWallet"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WalletService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WALLET_SERVICE_NAME = "WalletService";
