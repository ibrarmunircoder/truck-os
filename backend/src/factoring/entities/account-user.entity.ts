import { AccountEntity } from 'src/factoring/entities';
import { AccountUserAccountUserTypeEnum } from 'src/factoring/enums';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * The people associated to the Company
 */
@Entity({ name: 'account_user' })
export class AccountUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: true })
  birthday?: Date;

  @Column({ nullable: true, type: 'varchar' })
  language?: string;

  @Column({ nullable: true, type: 'varchar' })
  birthplace?: string;

  @Column({ nullable: true, type: 'varchar' })
  nationality?: string;

  @Column({ nullable: true, type: 'varchar' })
  city?: string;

  @Column({ nullable: true, type: 'varchar' })
  postalCode?: string;

  @Column({ nullable: true, type: 'varchar' })
  streetAndNumber?: string;

  @Column({ nullable: true, type: 'integer' })
  houseNumber?: number;

  @Column({ nullable: true, type: 'varchar' })
  country?: string;

  @Column({ nullable: false, type: 'enum', enum: ['accountRepresentative', 'accountBeneficialOwner'] })
  accountUserType: AccountUserAccountUserTypeEnum;

  @Column({ nullable: false })
  accountId: string;

  @ManyToOne(() => AccountEntity, (account) => account.accountUsers, { nullable: false, cascade: ['soft-remove'] })
  account: AccountEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
