import { AccountEntity, DebtorEntity, DebtorRepresentativeEntity, OrderFilesEntity } from 'src/factoring/entities';
import { ReceivableStatusEnum } from 'src/factoring/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  invoiceNumber?: string;

  @Column({ nullable: true, type: 'integer' })
  priority?: number;

  @Column({ nullable: true })
  deliveryDate?: Date;

  @Column({ nullable: true })
  invoiceDate?: Date;

  @Column({ nullable: true, type: 'varchar' })
  applicableLaw?: string;

  @Column({ nullable: true, type: 'varchar' })
  paymentTerm?: string;

  @Column({ nullable: true, type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  invoiceAmount?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  receivableAmount?: number;

  @Column({ nullable: true })
  accountId: string;

  @ManyToOne(() => AccountEntity, (account) => account.orders, { nullable: false, cascade: ['soft-remove'] })
  account: AccountEntity;

  @Column({ nullable: true })
  debtorId: string;

  @Column({ default: false })
  draft?: boolean;

  @Column({ nullable: true, type: 'varchar' })
  receivableReferenceId?: string;

  @Column({ nullable: true })
  debtorRepresentativeId?: string;

  @OneToOne(() => DebtorRepresentativeEntity, (debtorRepresentative) => debtorRepresentative.order, {
    nullable: true,
    cascade: ['soft-remove'],
  })
  debtorRepresentative: DebtorRepresentativeEntity;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.orders, { nullable: true, cascade: ['soft-remove'] })
  debtor: DebtorEntity;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Object.values(ReceivableStatusEnum),
  })
  status?: ReceivableStatusEnum;
  @OneToMany(() => OrderFilesEntity, (orderFile) => orderFile.order)
  files: OrderFilesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
