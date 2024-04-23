import { User } from 'apps/auth/src/users/entities/User';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'wallets' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column({ type: 'float' })
  amount: number;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;
}
