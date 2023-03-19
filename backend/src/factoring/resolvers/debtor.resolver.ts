import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  DebtorArgType,
  DebtorBulkArgType,
  DebtorCreateDto,
  DebtorRepresentativeArgType,
  DebtorUpdateDto,
  FindDebtorDto,
  OrderArgType,
} from 'src/factoring/dtos';
import { AccountEntity, DebtorRepresentativeEntity, OrderEntity } from 'src/factoring/entities';
import {
  AccountFindQueryInterface,
  DebtorRepresentativeFindQueryInterface,
  OrderFindQueryInterface,
} from 'src/factoring/interfaces';
import { AccountLoader, DebtorDebtorRepresentativeLoader, DebtorOrderLoader } from 'src/factoring/loaders';
import {
  mapAccountToModel,
  mapDebtorRepresentativeToModel,
  mapDebtorToModel,
  mapOrderToModel,
  mapPaymentProcessorDebtorToModel,
} from 'src/factoring/mappers';
import {
  AccountModel,
  DebtorModel,
  DebtorPageModel,
  DebtorRepresentativePageModel,
  OrderPageModel,
  PaymentProcessorDebtorDataModel,
  PaymentProcessorDebtorListModel,
} from 'src/factoring/models';
import { WalbingPaymentProcessorServiceProvider } from 'src/factoring/providers';
import { DebtorRepository } from 'src/factoring/repositories';
import { DebtorService } from 'src/factoring/services';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';

@Resolver(() => DebtorModel)
export class DebtorResolver {
  constructor(
    @InjectRepository(DebtorRepository)
    private readonly debtorRepository: DebtorRepository,
    private readonly debtorService: DebtorService,
    private readonly utilityService: UtilityService,
    private readonly walbingPaymentProcessorServiceProvider: WalbingPaymentProcessorServiceProvider,
  ) {}

  @Query(() => DebtorModel)
  @UseGuards(JwtAuthGuard)
  async debtor(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorEntity = await this.debtorService.findById(id, {
      fields,
    });

    if (!debtorEntity) {
      throw new NotFoundException(`Debtor with id ${id} not found`);
    }

    return mapDebtorToModel(debtorEntity);
  }

  @Query(() => DebtorPageModel)
  @UseGuards(JwtAuthGuard)
  async debtors(
    @Args({ type: () => DebtorArgType }) args: DebtorArgType,

    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [debtorEntities, totalCount] = await this.debtorService.findAndCount({ ...args, fields });
    return {
      totalCount,
      data: debtorEntities.map((debtorEntity) => mapDebtorToModel(debtorEntity)),
    };
  }

  @Mutation(() => DebtorModel)
  @UseGuards(JwtAuthGuard)
  async createDebtor(
    @Args({ name: 'debtor', type: () => DebtorCreateDto })
    debtorData: DebtorCreateDto,
  ): Promise<DebtorModel> {
    const debtorEntity = await this.debtorService.create(debtorData);
    return mapDebtorToModel(debtorEntity);
  }

  @Mutation(() => DebtorModel)
  @UseGuards(JwtAuthGuard)
  async updateDebtor(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'debtor', type: () => DebtorUpdateDto }) debtorData: DebtorUpdateDto,
  ): Promise<DebtorModel> {
    const debtorEntity = await this.debtorService.update(id, debtorData);
    return mapDebtorToModel(debtorEntity);
  }

  @Mutation(() => ID)
  @UseGuards(JwtAuthGuard)
  async deleteDebtor(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<string> {
    return this.debtorService.deleteById(id);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteDebtors(@Args({ type: () => DebtorBulkArgType }) args: DebtorBulkArgType): Promise<string[]> {
    return this.debtorService.deleteByIds(args);
  }

  @Query(() => [PaymentProcessorDebtorDataModel])
  @UseGuards(JwtAuthGuard)
  async debtorSearch(@Args('name') name: string) {
    const debtorData = await this.debtorService.searchWalbingDebtors(name);
    return debtorData.map((debtor) => mapPaymentProcessorDebtorToModel(debtor));
  }

  @Query(() => DebtorModel)
  @UseGuards(JwtAuthGuard)
  async findDebtor(
    @Args({ name: 'debtorData', type: () => FindDebtorDto }) debtorData: FindDebtorDto,
  ): Promise<DebtorModel> {
    const debtorEntity = await this.debtorService.findDebtor(debtorData);
    const debtorDetails = mapDebtorToModel(debtorEntity);
    if (!debtorDetails) {
      return { isInternalDebtorFound: false };
    } else {
      return { ...debtorDetails, isInternalDebtorFound: true };
    }
  }

  @Mutation(() => [PaymentProcessorDebtorListModel])
  @UseGuards(JwtAuthGuard)
  async getDebtorsDataList() {
    const debtors = await this.debtorService.getDebtorsList();
    return debtors;
  }
  /**
   * Many-to-One Relation. There is debtor  in one account.
   */
  @ResolveField(() => AccountModel)
  async account(
    @Parent() debtorModel: DebtorModel,
    @Loader(AccountLoader) accountLoader: DataLoader<AccountFindQueryInterface, AccountEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountEntity = await accountLoader.load({ filter: { id: { equalTo: debtorModel.accountId } }, fields });
    return mapAccountToModel(accountEntity);
  }
  /**
   * One-to-Many Relation. An debtor has many orders.
   */
  @ResolveField(() => OrderPageModel)
  async orders(
    @Args({ type: () => OrderArgType }) args: OrderArgType,
    @Parent() debtorModel: DebtorModel,
    @Loader(DebtorOrderLoader) debtorOrderLoader: DataLoader<OrderFindQueryInterface, OrderEntity[]>,

    @Info() info: GraphQLResolveInfo,
  ): Promise<OrderPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const orderEntities = await debtorOrderLoader.load({
      ...args,
      fields,
      filter: { debtorId: { equalTo: debtorModel.id } },
    });
    return {
      totalCount: orderEntities.length,
      data: orderEntities.map((order) => mapOrderToModel(order)),
    };
  }
  /**
   * One-to-Many Relation. An debtor has many debtorRepresentatives.
   */
  @ResolveField(() => DebtorRepresentativePageModel)
  async debtorRepresentatives(
    @Args({ type: () => DebtorRepresentativeArgType }) args: DebtorRepresentativeArgType,
    @Parent() debtorModel: DebtorModel,
    @Loader(DebtorDebtorRepresentativeLoader)
    debtorDebtorRepresentativeLoader: DataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity[]>,

    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorRepresentativePageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorRepresentativeEntities = await debtorDebtorRepresentativeLoader.load({
      ...args,
      fields,
      filter: { debtorId: { equalTo: debtorModel.id } },
    });
    return {
      totalCount: debtorRepresentativeEntities.length,
      data: debtorRepresentativeEntities.map((debtorRepresentative) =>
        mapDebtorRepresentativeToModel(debtorRepresentative),
      ),
    };
  }

  @ResolveField(() => String)
  async debtorStatus(@Parent() debtor: DebtorModel): Promise<string> {
    if (!debtor.debtorReferenceId) {
      return '';
    }
    const walbingDebtor = await this.walbingPaymentProcessorServiceProvider.getDebtor(debtor.debtorReferenceId);
    return walbingDebtor.status;
  }
}
