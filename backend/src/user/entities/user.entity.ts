import { AccountEntity } from 'src/factoring/entities';
import { UserLoginHistoryEntity } from 'src/user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as CryptoJs from 'crypto-js';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, type: 'citext' })
  email: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  phone?: string;

  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  @Column({ nullable: true, type: 'varchar' })
  locale?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    transformer: {
      to: (value: string): string => {
        if (value) {
          return CryptoJs.AES.encrypt(value, process.env['API_KEY_HASH_SECRET']).toString();
        }
        return null;
      },
      from: (value?: string): string => {
        if (value) {
          const bytes = CryptoJs.AES.decrypt(value, process.env['API_KEY_HASH_SECRET']);
          return bytes.toString(CryptoJs.enc.Utf8);
        }
        return null;
      },
    },
  })
  apiKey?: string;

  @Column({ nullable: true, type: 'varchar' })
  timezone?: string;

  @Column({ nullable: false, unique: true, type: 'varchar' })
  roqIdentifier: string;

  @Column({ nullable: true, type: 'timestamp' })
  optedInAt?: Date;

  @Column({ nullable: true, default: true, type: 'boolean' })
  active?: boolean;

  @Column({ nullable: true, default: false, type: 'boolean' })
  sync?: boolean;

  @OneToMany(() => UserLoginHistoryEntity, (userLoginHistory) => userLoginHistory.user)
  userLoginHistories: UserLoginHistoryEntity[];

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
