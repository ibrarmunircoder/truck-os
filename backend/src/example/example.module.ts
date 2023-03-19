import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import { AuthorEntity, BookEntity } from 'src/example/entities';
import { AuthorBookLoader, AuthorLoader, BookFileLoader, BookLoader } from 'src/example/loaders';
import { AuthorRepository, BookRepository } from 'src/example/repositories';
import { AuthorResolver, BookResolver } from 'src/example/resolvers';
import { AuthorService, BookService } from 'src/example/services';
import { LibraryModule } from 'src/library';
import { PlatformSpaceClientModule } from 'src/platformClient/platformSpaceClient';
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity, AuthorRepository, BookEntity, BookRepository]),
    LibraryModule,
    AuthModule,
    PlatformSpaceClientModule,
  ],
  providers: [
    AuthorService,
    AuthorResolver,
    AuthorLoader,
    BookService,
    BookResolver,
    BookLoader,
    AuthorBookLoader,
    BookFileLoader,
  ],
  exports: [TypeOrmModule, AuthorService, BookService],
  controllers: [],
})
export class ExampleModule {}
