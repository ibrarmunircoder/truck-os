import { AuthorEntity } from 'src/example/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  title?: string;

  @Column({ nullable: true })
  publishingDate?: Date;

  @Column({ nullable: true, type: 'decimal' })
  price?: number;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ nullable: true, type: 'boolean' })
  published?: boolean;

  @Column({ nullable: true, type: 'boolean' })
  outOfStock?: boolean;

  @Column({ nullable: true })
  authorId: string;

  @ManyToOne(() => AuthorEntity, (author) => author.books, {
    nullable: true,
    cascade: ['soft-remove'],
  })
  author: AuthorEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
