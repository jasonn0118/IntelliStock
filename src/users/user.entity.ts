import { Exclude } from 'class-transformer';
import { Watchlist } from '../watchlist/watchlist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './constants/user-contants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fisrtName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BASIC_USER })
  role: UserRole;

  @OneToMany(() => Watchlist, (watchlist) => watchlist.user)
  watchListEntries?: Watchlist[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
