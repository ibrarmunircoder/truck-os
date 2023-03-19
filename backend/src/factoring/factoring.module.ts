import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import {
  AccountEntity,
  AccountFilesEntity,
  AccountUserEntity,
  DebtorEntity,
  DebtorRepresentativeEntity,
  OrderEntity,
  OrderFilesEntity,
} from 'src/factoring/entities';
import {
  AccountAccountUserLoader,
  AccountDebtorLoader,
  AccountFileLoader,
  AccountLoader,
  AccountOrderLoader,
  AccountUserLoader,
  DebtorDebtorRepresentativeLoader,
  DebtorLoader,
  DebtorOrderLoader,
  DebtorRepresentativeLoader,
  OrderFileLoader,
  OrderLoader,
} from 'src/factoring/loaders';
import { WalbingPaymentProcessorServiceProvider } from 'src/factoring/providers';
import {
  AccountFilesRepository,
  AccountRepository,
  AccountUserRepository,
  DebtorRepository,
  DebtorRepresentativeRepository,
  OrderFilesRepository,
  OrderRepository,
} from 'src/factoring/repositories';
import {
  AccountResolver,
  AccountUserResolver,
  DebtorRepresentativeResolver,
  DebtorResolver,
  OrderResolver,
  S3Resolver,
} from 'src/factoring/resolvers';
import {
  AccountService,
  AccountUserService,
  DebtorRepresentativeService,
  DebtorService,
  OrderService,
} from 'src/factoring/services';
import { LibraryModule } from 'src/library';
import { PlatformClientModule } from 'src/platformClient';
import { PlatformSpaceClientModule } from 'src/platformClient/platformSpaceClient';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      AccountRepository,
      AccountUserEntity,
      AccountUserRepository,
      OrderEntity,
      OrderRepository,
      DebtorEntity,
      DebtorRepository,
      DebtorRepresentativeEntity,
      DebtorRepresentativeRepository,
      OrderFilesEntity,
      AccountFilesEntity,
      AccountFilesRepository,
      OrderFilesRepository,
    ]),
    PlatformSpaceClientModule,
    PlatformClientModule,
    LibraryModule,
    forwardRef(() => AuthModule),
  ],
  providers: [
    AccountService,
    AccountResolver,
    AccountLoader,
    AccountUserService,
    AccountUserResolver,
    AccountUserLoader,
    AccountAccountUserLoader,
    OrderService,
    OrderResolver,
    OrderLoader,
    OrderFileLoader,
    AccountOrderLoader,
    DebtorOrderLoader,
    OrderFileLoader,
    DebtorService,
    DebtorResolver,
    DebtorLoader,
    AccountDebtorLoader,
    DebtorRepresentativeService,
    DebtorRepresentativeResolver,
    DebtorRepresentativeLoader,
    DebtorDebtorRepresentativeLoader,
    AccountFileLoader,
    WalbingPaymentProcessorServiceProvider,
    S3Resolver,
  ],
  exports: [
    TypeOrmModule,
    AccountService,
    AccountUserService,
    OrderService,
    DebtorService,
    DebtorRepresentativeService,
    WalbingPaymentProcessorServiceProvider,
  ],
  controllers: [],
})
export class FactoringModule {}
