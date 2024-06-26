import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { JwtModule } from '@nestjs/jwt';
import { Wallet } from 'apps/wallet/src/entities/Wallet';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'authenticate',
      database: 'nestjs_grpc',
      entities: [User, Wallet],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Wallet]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
