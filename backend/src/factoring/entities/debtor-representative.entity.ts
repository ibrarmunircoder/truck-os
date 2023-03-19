import { DebtorEntity, OrderEntity } from 'src/factoring/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'debtor_representative' })
export class DebtorRepresentativeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  name?: string;

  @Column({ nullable: true, type: 'varchar' })
  firstName?: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName?: string;

  @Column({ nullable: true, type: 'varchar' })
  phone?: string;

  @Column({ nullable: true, type: 'varchar' })
  email?: string;

  @Column({ nullable: false })
  debtorId: string;

  @ManyToOne(() => DebtorEntity, (debtor) => debtor.debtorRepresentatives, {
    nullable: false,
    cascade: ['soft-remove'],
  })
  debtor: DebtorEntity;

  @OneToOne(() => OrderEntity, (order) => order.debtorRepresentative, {
    nullable: true,
    cascade: ['soft-remove'],
  })
  order: OrderEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
