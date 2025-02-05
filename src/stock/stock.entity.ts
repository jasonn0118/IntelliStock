import { Company } from 'src/company/company.entity';
import { StockQuote } from 'src/stockquote/stock-quote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ticker: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  exchange: string; // NYSE, NASDAQ, etc.

  @Column({ type: 'timestamp', nullable: true })
  lastUpdated: Date;

  // Relation to historical quotes
  @OneToMany(() => StockQuote, (quote) => quote.stock)
  quotes: StockQuote[];

  // New foreign key column for the relationship using the company's id.
  @Column({ nullable: true })
  companyId: number;

  // Owning side of the one-to-one relationship with Company.
  @OneToOne(() => Company, (company) => company.stock)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
