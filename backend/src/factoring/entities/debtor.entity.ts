import { AccountEntity, DebtorRepresentativeEntity, OrderEntity } from 'src/factoring/entities';
import { DebtorStatusEnum } from 'src/factoring/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'debtor',
})
export class DebtorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  name?: string;

  @Column({ nullable: true, type: 'integer' })
  priority?: number;

  @Column({ nullable: true, type: 'varchar' })
  vatNumber?: string;

  @Column({ nullable: true, type: 'varchar' })
  addressAddon?: string;

  @Column({ nullable: true, type: 'varchar' })
  commercialRegister?: string;

  @Column({ nullable: true, type: 'varchar' })
  commercialRegisterNumber?: string;

  @Column({ nullable: true, type: 'varchar' })
  legalForm?: string;

  @Column({ nullable: true, type: 'boolean' })
  validated?: boolean;

  @Column({ nullable: true, type: 'varchar' })
  debtorReferenceId?: string;

  @Column({ nullable: true, type: 'varchar' })
  city?: string;

  @Column({ nullable: true, type: 'varchar' })
  postalCode?: string;

  @Column({ nullable: true, type: 'varchar' })
  streetAndNumber?: string;

  @Column({ nullable: true, type: 'varchar' })
  country?: string;

  @Column({ nullable: true })
  accountId: string;

  @ManyToOne(() => AccountEntity, (account) => account.debtors, { nullable: true, cascade: ['soft-remove'] })
  account: AccountEntity;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Object.values(DebtorStatusEnum),
  })
  status?: DebtorStatusEnum;

  @OneToMany(() => OrderEntity, (order) => order.debtor)
  orders: OrderEntity[];

  @OneToMany(() => DebtorRepresentativeEntity, (debtorRepresentative) => debtorRepresentative.debtor)
  debtorRepresentatives: DebtorRepresentativeEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
