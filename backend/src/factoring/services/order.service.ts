/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
const dayjs = require('dayjs');
import { GraphQLResolveInfo } from 'graphql';
import { RECEIVABLE_TYPE } from 'src/factoring/constants';
import { OrderCreateDto, OrderFileCreateDto, OrderUpdateDto } from 'src/factoring/dtos';
import { OrderEntity, OrderFilesEntity } from 'src/factoring/entities';
import { OrderSearchKeyEnum } from 'src/factoring/enums';
import {
  OrderFilesFindQueryInterface,
  OrderFindQueryInterface,
  WalbingDocumentUploadInteface,
} from 'src/factoring/interfaces';
import { mapDebtorToModel } from 'src/factoring/mappers';
import { WalbingPaymentProcessorServiceProvider } from 'src/factoring/providers';
import { ReceivableSellingPriceInterface } from 'src/factoring/providers/interfaces';
import {
  AccountRepository,
  DebtorRepository,
  DebtorRepresentativeRepository,
  OrderFilesRepository,
  OrderRepository,
} from 'src/factoring/repositories';
import { DebtorService } from 'src/factoring/services';
import { UtilityService } from 'src/library/services';
import { PlatformSpaceClientService } from 'src/platformClient/platformSpaceClient/services';
import { FindManyOptions, ILike } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    protected orderRepository: OrderRepository,
    @InjectRepository(AccountRepository)
    protected accountRepository: AccountRepository,
    @InjectRepository(DebtorRepository)
    protected debtorRepository: DebtorRepository,
    @InjectRepository(DebtorRepresentativeRepository)
    protected debtorRepresentativeRepository: DebtorRepresentativeRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService,
    private readonly platformSpaceClientService: PlatformSpaceClientService,
    private readonly walbingPaymentProcessorServiceProvider: WalbingPaymentProcessorServiceProvider,
    @Inject(forwardRef(() => DebtorService))
    private readonly debtorService: DebtorService,
    @InjectRepository(OrderFilesRepository)
    protected orderFilesRepository: OrderFilesRepository,
  ) {}

  public async create(orderInput: OrderCreateDto): Promise<OrderEntity> {
    const { accountId, debtorId, ...orderData } = orderInput;
    const orderEntity = await this.orderRepository.create(orderData);

    if (accountId) {
      const accountEntity = await this.accountRepository.findOne(accountId);
      if (!accountEntity) {
        throw new NotFoundException(`Account with id ${accountId} not found`);
      }
      orderEntity.account = accountEntity;
    }
    if (debtorId) {
      const debtorEntity = await this.debtorRepository.findOne(debtorId);
      if (!debtorEntity) {
        throw new NotFoundException(`Debtor with id ${debtorId} not found`);
      }
      orderEntity.debtor = debtorEntity;
    }

    return this.orderRepository.save(orderEntity);
  }

  public async update(id: string, orderInput: OrderUpdateDto, info?: GraphQLResolveInfo): Promise<OrderEntity> {
    const { accountId, debtorId, ...orderData } = orderInput;
    const orderEntity = await this.orderRepository.preload({ id, ...orderData });

    if (!orderEntity) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    if (accountId) {
      const accountEntity = await this.accountRepository.findOne(accountId);
      if (!accountEntity) {
        throw new NotFoundException(`Account with id ${accountId} not found`);
      }
      orderEntity.account = accountEntity;
    }

    if (debtorId) {
      const debtorEntity = await this.debtorRepository.findOne(debtorId);
      if (!debtorEntity) {
        throw new NotFoundException(`Debtor with id ${debtorId} not found`);
      }
      if (!debtorEntity.debtorReferenceId) {
        const fields = this.utilityService.getInfoFields(info);
        const debtorDetails = await this.debtorService.findById(debtorId, {
          fields,
        });
        const debtorData = mapDebtorToModel(debtorDetails);
        debtorData.debtorReferenceId = uuid();
        const debtorParams = {
          name: debtorData.name,
          legalForm: debtorData.legalForm,
          registrationAuthorityCode: debtorData.commercialRegister,
          registrationNumber: debtorData.commercialRegisterNumber,
          vatNumber: debtorData.vatNumber,
          lei: '',
          relation: {
            applicableLaw: orderData.applicableLaw || 'DE',
            paymentTerms: parseInt(orderData.paymentTerm, 10),
          },
          address: {
            addressAddon: debtorData.addressAddon,
            street: debtorData.streetAndNumber,
            postCode: debtorData.postalCode,
            city: debtorData.city,
            country: debtorData.country,
          },
        };
        await this.walbingPaymentProcessorServiceProvider.createNewDebtor(debtorData.debtorReferenceId, debtorParams);
        const debtor = await this.walbingPaymentProcessorServiceProvider.submitDebtor(debtorData.debtorReferenceId);
        await this.debtorService.update(debtorId, {
          ...debtorData,
          status: debtor.debtorStatus,
          priority: 1,
        });
      }
      orderEntity.debtor = debtorEntity;
    }

    return this.orderRepository.save(orderEntity);
  }

  public async findById(id: string, query: OrderFindQueryInterface = {}): Promise<OrderEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.orderRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: OrderFindQueryInterface): Promise<OrderEntity[]> {
    return this.orderRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const orderFiles = await this.orderFilesRepository
      .buildSelectQuery({
        filter: { orderId: { equalTo: id } },
      })
      .getMany();
    if (orderFiles.length) {
      await this.orderFilesRepository.remove(orderFiles);
    }
    const orderEntity = await this.orderRepository.buildDeleteQuery({ filter: { id: { equalTo: id } } }).getOne();

    if (!orderEntity) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    const orderEntityId = orderEntity.id;
    await this.orderRepository.remove(orderEntity);

    return orderEntityId;
  }

  public async deleteByIds(query: OrderFindQueryInterface): Promise<string[]> {
    const orderEntities = await this.orderRepository.buildDeleteQuery(query).getMany();
    const orderEntitiesIds = orderEntities.map((removedEntity) => removedEntity.id);
    await this.orderRepository.remove(orderEntities);
    return orderEntitiesIds;
  }

  public async findAndCount(query: OrderFindQueryInterface): Promise<[OrderEntity[], number]> {
    const { search, limit, offset, filter } = query;
    if (search && search.key === OrderSearchKeyEnum.DEBTOR_NAME) {
      const options: FindManyOptions<OrderEntity> = {};

      if (offset) {
        options.skip = offset;
      }
      if (limit) {
        options.take = limit;
      }

      if (filter) {
        options.where = {
          debtor: {
            name: search.value && search.value.length >= 3 ? ILike(`%${search.value}%`) : ILike(`${search.value}%`),
          },
          accountId: filter.accountId?.equalTo,
        };
      }

      return this.orderRepository.findAndCount({
        ...options,
        relations: ['account', 'debtor'],
        order: { priority: 'ASC' },
      });
    }

    return this.orderRepository.buildSelectQuery(query).getManyAndCount();
  }

  public async uploadWalbingDocument(
    orderFile: OrderFilesEntity,
    referenceId: string,
  ): Promise<WalbingDocumentUploadInteface> {
    const file = await axios.get(orderFile.getSignedURL, {
      responseType: 'arraybuffer',
    });
    return this.walbingPaymentProcessorServiceProvider.uploadDocument(
      referenceId,
      file.data,
      orderFile.fileCategory,
      orderFile.name,
    );
  }

  public async createInvoice(orderId: string, receivableAmount: number): Promise<string> {
    try {
      const order = await this.findById(orderId);
      const debtorRepresentative = await this.debtorRepresentativeRepository.findOne(order.debtorRepresentativeId, {
        relations: ['debtor'],
      });

      if (!debtorRepresentative || !order) {
        throw new NotFoundException('Debtor or Order does not exist to create invoice');
      }

      const orderDocuments = await this.getOrderFiles({
        filter: {
          orderId: {
            equalTo: order.id,
          },
        },
      });
      const referenceId = uuid();
      const receivable = await this.walbingPaymentProcessorServiceProvider.createReceivable(referenceId, {
        receivableType: RECEIVABLE_TYPE,
        invoiceNumber: order.invoiceNumber,
        invoiceAmount: order.invoiceAmount,
        invoiceDate: dayjs(new Date(order.invoiceDate)).format('YYYY-MM-DD'),
        invoiceDueDate: dayjs(new Date(order.invoiceDate)).add(Number(order.paymentTerm), 'day').format('YYYY-MM-DD'),
        debtorContact: {
          name: debtorRepresentative.name,
          phone: debtorRepresentative.phone,
          email: debtorRepresentative.email,
        },
        debtorReferenceId: debtorRepresentative.debtor.debtorReferenceId,
        applicableLaw: order.applicableLaw,
        requestIPU: false,
        invoiceCurrency: this.configService.get('application.invoiceCurrency'),
      });
      const documentPromises = orderDocuments.map((document) => this.uploadWalbingDocument(document, referenceId));
      await Promise.all(documentPromises);
      const submitReceivable = await this.walbingPaymentProcessorServiceProvider.submitReceivableToReview(referenceId);
      const updatedOrder = await this.update(order.id, {
        receivableReferenceId: referenceId,
        receivableAmount,
        draft: false,
      });

      if (receivable && submitReceivable && updatedOrder) {
        return referenceId;
      }
      return '';
    } catch (err) {
      console.error(err);
      if (err.message) {
        throw new BadRequestException(err?.message ?? 'Bad Request!');
      }
      throw new InternalServerErrorException('Something went wrong!. Please try again!');
    }
  }

  public async deleteOrderFiles(query: OrderFilesFindQueryInterface): Promise<string[]> {
    const orderFilesEntities = await this.orderFilesRepository.buildDeleteQuery(query).getMany();
    const orderFilesEntitiesIds = orderFilesEntities.map((orderFilesEntity) => orderFilesEntity.id);
    await this.orderFilesRepository.remove(orderFilesEntities);
    return orderFilesEntitiesIds;
  }

  public async receivableSellingPrice(
    referenceId: string,
    invoiceDate: string,
    dueDate: string,
  ): Promise<ReceivableSellingPriceInterface> {
    return await this.walbingPaymentProcessorServiceProvider.receivableSellingPrice(referenceId, invoiceDate, dueDate);
  }

  public async updateOrderRepresentative(id: string, debtorRepresentativeId: string): Promise<OrderEntity> {
    const orderEntity = await this.orderRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
    if (!orderEntity) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    orderEntity.debtorRepresentativeId = debtorRepresentativeId;
    return this.orderRepository.save(orderEntity);
  }

  public async createOrderFile(orderFile: OrderFileCreateDto): Promise<OrderFilesEntity> {
    const orderFilesEntity = this.orderFilesRepository.create(orderFile);
    return this.orderFilesRepository.save(orderFilesEntity);
  }

  public async getOrderFiles(query: OrderFilesFindQueryInterface): Promise<OrderFilesEntity[]> {
    return this.orderFilesRepository.buildSelectQuery(query).getMany();
  }
}
