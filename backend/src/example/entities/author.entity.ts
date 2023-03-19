import { BookEntity } from 'src/example/entities';
import { AuthorGenderEnum } from 'src/example/enums';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'author' })
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  name?: string;

  @Column({ nullable: true, type: 'varchar' })
  surname?: string;

  @Column({ nullable: true, type: 'integer' })
  age?: number;

  @Column({ nullable: true })
  birthDate?: Date;

  @Column({ nullable: true, type: 'varchar' })
  email?: string;

  /**
   * Address with street, houseNumber, zipCode, city, country as json fields
   */
  @Column({ nullable: true, type: 'json' })
  address?: Record<string, unknown>;

  @Column({ nullable: true, type: 'enum', enum: ['Male', 'Female', 'Others'] })
  gender?: AuthorGenderEnum;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
