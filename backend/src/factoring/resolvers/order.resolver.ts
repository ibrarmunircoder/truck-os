import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Float, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import { gql } from 'apollo-server-express';
import { plainToClass } from 'class-transformer';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  OrderArgType,
  OrderBulkArgType,
  OrderCreateDto,
  OrderFileCreateDto,
  OrderFilesBulkArgType,
  OrderUpdateDto,
} from 'src/factoring/dtos';
import { AccountEntity, DebtorEntity, DebtorRepresentativeEntity, OrderFilesEntity } from 'src/factoring/entities';
import {
  AccountFindQueryInterface,
  DebtorFindQueryInterface,
  DebtorRepresentativeFindQueryInterface,
  OrderFilesFindQueryInterface,
} from 'src/factoring/interfaces';
import { AccountLoader, DebtorLoader, DebtorRepresentativeLoader, OrderFileLoader } from 'src/factoring/loaders';
import {
  mapAccountToModel,
  mapDebtorRepresentativeToModel,
  mapDebtorToModel,
  mapOrderToModel,
} from 'src/factoring/mappers';
import {
  AccountModel,
  DebtorModel,
  DebtorRepresentativeModel,
  OrderFileModel,
  OrderModel,
  OrderPageModel,
  ReceivableInfoModel,
  ReceivableSellingPriceModel,
} from 'src/factoring/models';
import { WalbingPaymentProcessorServiceProvider } from 'src/factoring/providers';
import { OrderRepository } from 'src/factoring/repositories';
import { OrderService } from 'src/factoring/services';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';
import { FileStatusEnum } from 'src/platformClient/platformSpaceClient/enums';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { PlatformClientService } from 'src/platformClient/services';

@Resolver(() => OrderModel)
export class OrderResolver {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    private readonly orderService: OrderService,
    private readonly utilityService: UtilityService,
    private readonly platformSpaceClientService: PlatformSpaceClientService,
    private readonly platformClientService: PlatformClientService,
    private readonly walbingPaymentProcessorServiceProvider: WalbingPaymentProcessorServiceProvider,
  ) {}

  @Query(() => OrderModel)
  @UseGuards(JwtAuthGuard)
  async order(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<OrderModel> {
    const fields = this.utilityService.getInfoFields(info);
    const orderEntity = await this.orderService.findById(id, {
      fields,
    });

    if (!orderEntity) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return mapOrderToModel(orderEntity);
  }

  @Query(() => OrderPageModel)
  @UseGuards(JwtAuthGuard)
  async orders(
    @Args({ type: () => OrderArgType }) args: OrderArgType,

    @Info() info: GraphQLResolveInfo,
  ): Promise<OrderPageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [orderEntities, totalCount] = await this.orderService.findAndCount({ ...args, fields });
    return {
      totalCount,
      data: orderEntities.map((orderEntity) => mapOrderToModel(orderEntity)),
    };
  }

  @Mutation(() => OrderModel)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Args({ name: 'order', type: () => OrderCreateDto })
    orderData: OrderCreateDto,
  ): Promise<OrderModel> {
    const orderEntity = await this.orderService.create(orderData);
    return mapOrderToModel(orderEntity);
  }

  @Mutation(() => OrderModel)
  @UseGuards(JwtAuthGuard)
  async updateOrder(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'order', type: () => OrderUpdateDto }) orderData: OrderUpdateDto,
    @Info() info: GraphQLResolveInfo,
  ): Promise<OrderModel> {
    const orderEntity = await this.orderService.update(id, orderData, info);
    return mapOrderToModel(orderEntity);
  }

  @Mutation(() => ID)
  @UseGuards(JwtAuthGuard)
  async deleteOrder(@Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string): Promise<string> {
    return this.orderService.deleteById(id);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteOrders(@Args({ type: () => OrderBulkArgType }) args: OrderBulkArgType): Promise<string[]> {
    return this.orderService.deleteByIds(args);
  }

  @Mutation(() => OrderFileModel)
  @UseGuards(JwtAuthGuard)
  async saveOrderFile(
    @Args({
      name: 'data',
      type: () => OrderFileCreateDto,
    })
    data: OrderFileCreateDto,
  ): Promise<OrderFileModel> {
    const file = await this.orderService.createOrderFile({
      ...data,
    });
    return plainToClass(OrderFileModel, file);
  }

  @Mutation(() => OrderFileModel, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async updateOrderFileStatus(
    @Args({ name: 'fileId', type: () => ID }, ParseUUIDStringPipe) fileId: string,
    @Args({ name: 'status', type: () => FileStatusEnum }) status: FileStatusEnum,
  ): Promise<OrderFileModel> {
    const { data: data } = await this.platformClientService.request({
      mutation: gql`
        mutation UpdateFileStatusMutation($fileId: ID!, $status: FileStatusEnum!) {
          updateFileStatus(fileId: $fileId, status: $status) {
            id
            status
            name
            url
            fileCategory {
              name
              key
            }
          }
        }
      `,
      variables: {
        fileId,
        status,
      },
    });
    return data.updateFileStatus;
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async createInvoice(
    @Args({ name: 'orderId', type: () => ID }, ParseUUIDStringPipe) orderId: string,
    @Args({ name: 'receivableAmount', type: () => Float }) receivableAmount: number,
  ): Promise<string> {
    return this.orderService.createInvoice(orderId, receivableAmount);
  }

  @Mutation(() => OrderModel)
  async updateOrderRepresentative(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'debtorRepresentativeId', type: () => ID }, ParseUUIDStringPipe) debtorRepresentativeId: string,
  ): Promise<OrderModel> {
    const orderEntity = await this.orderService.updateOrderRepresentative(id, debtorRepresentativeId);
    return mapOrderToModel(orderEntity);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteOrderFiles(@Args({ type: () => OrderFilesBulkArgType }) args: OrderFilesBulkArgType): Promise<string[]> {
    return this.orderService.deleteOrderFiles(args);
  }

  /**
   * Many-to-One Relation. There is order  in one account.
   */
  @ResolveField(() => AccountModel)
  async account(
    @Parent() orderModel: OrderModel,
    @Loader(AccountLoader) accountLoader: DataLoader<AccountFindQueryInterface, AccountEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<AccountModel> {
    const fields = this.utilityService.getInfoFields(info);
    const accountEntity = await accountLoader.load({ filter: { id: { equalTo: orderModel.accountId } }, fields });
    return mapAccountToModel(accountEntity);
  }
  /**
   * Many-to-One Relation. There is order  in one debtor.
   */
  @ResolveField(() => DebtorModel)
  async debtor(
    @Parent() orderModel: OrderModel,
    @Loader(DebtorLoader) debtorLoader: DataLoader<DebtorFindQueryInterface, DebtorEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorEntity = await debtorLoader.load({ filter: { id: { equalTo: orderModel.debtorId } }, fields });
    return mapDebtorToModel(debtorEntity);
  }

  @ResolveField(() => DebtorRepresentativeModel)
  async debtorRepresentative(
    @Parent() orderModel: OrderModel,
    @Loader(DebtorRepresentativeLoader)
    debtorRepresentativeLoader: DataLoader<DebtorRepresentativeFindQueryInterface, DebtorRepresentativeEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorRepresentativeModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorRepresentativeEntity = await debtorRepresentativeLoader.load({
      filter: { id: { equalTo: orderModel.debtorRepresentativeId } },
      fields,
    });
    return mapDebtorRepresentativeToModel(debtorRepresentativeEntity);
  }

  @ResolveField(() => [OrderFileModel])
  async orderFiles(
    @Parent() order: OrderModel,
    @Loader(OrderFileLoader)
    orderFileLoader: DataLoader<OrderFilesFindQueryInterface, OrderFilesEntity[]>,
    @Info()
    info: GraphQLResolveInfo,
  ): Promise<OrderFileModel[]> {
    const fields = this.utilityService.getInfoFields(info);
    const orderFiles = await orderFileLoader.load({
      fields,
      filter: { orderId: { equalTo: order.id } },
    });
    return orderFiles.map((file) =>
      plainToClass(OrderFileModel, {
        ...file,
        url: file.getSignedURL,
      }),
    );
  }

  @ResolveField(() => ReceivableInfoModel, { nullable: true })
  async receivable(@Parent() order: OrderModel): Promise<ReceivableInfoModel> {
    try {
      if (!order.receivableReferenceId) {
        return null;
      }
      const receivableInfo = await this.walbingPaymentProcessorServiceProvider.getReceivableInfo(
        order.receivableReferenceId,
      );
      return plainToClass(ReceivableInfoModel, receivableInfo);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  // receivable selling price
  @Query(() => ReceivableSellingPriceModel)
  async receivableSellingPrice(
    @Args('debtorReferenceId') debtorReferenceId: string,
    @Args('invoiceDate') invoiceDate: string,
    @Args('dueDate') dueDate: string,
  ) {
    const response = await this.orderService.receivableSellingPrice(debtorReferenceId, invoiceDate, dueDate);
    return response;
  }
}
