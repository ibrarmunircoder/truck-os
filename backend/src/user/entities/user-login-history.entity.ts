import { UserEntity } from 'src/user/entities';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user_login_history' })
export class UserLoginHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  ip: string;

  @Column({ nullable: false, type: 'varchar' })
  host: string;

  @Column({ nullable: false, type: 'timestamp' })
  timestamp: Date;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.userLoginHistories, { nullable: false, cascade: ['soft-remove'] })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
