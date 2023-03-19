import { AccountFilesEntity, AccountUserEntity, DebtorEntity, OrderEntity } from 'src/factoring/entities';
import { AccountKycStatusEnum } from 'src/factoring/enums';
import { UserEntity } from 'src/user/entities';
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

/**
 * The company of the Truck-OS user
 */
@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  companyName?: string;

  @Column({ nullable: true, type: 'varchar', default: '2HBR' })
  legalForm?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  companyRegisterNumber?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  city?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  phoneNumber?: string;

  @Column({ nullable: true, type: 'varchar' })
  postalCode?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  streetAndNumber?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  addressAddon?: string;

  @Column({ nullable: true, type: 'varchar', default: 'DE' })
  country?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  iban?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  bic?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  vatId?: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  walbingTerm?: boolean;

  @Column({ nullable: true, type: 'varchar', default: '' })
  registrationAuthority?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  registrationAuthorityCity?: string;

  @Column({ nullable: true, type: 'varchar', default: '' })
  registrationNumber?: string;

  @Column({ nullable: true, type: 'boolean', default: false })
  legalRepresentative?: boolean;

  @Column({ nullable: true, type: 'boolean', default: true })
  solePower?: boolean;

  @OneToMany(() => AccountUserEntity, (accountUser) => accountUser.account)
  accountUsers: AccountUserEntity[];

  @OneToMany(() => AccountFilesEntity, (accountFile) => accountFile.account)
  files: AccountFilesEntity[];

  @Column({
    nullable: true,
    type: 'enum',
    enum: Object.values(AccountKycStatusEnum),
    default: AccountKycStatusEnum.OPEN,
  })
  kycStatus?: AccountKycStatusEnum;

  @Column({ nullable: true })
  userId?: string;

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.account)
  orders: OrderEntity[];

  @OneToMany(() => DebtorEntity, (debtor) => debtor.account)
  debtors: DebtorEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
