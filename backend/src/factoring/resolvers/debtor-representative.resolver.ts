import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Loader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';
import { JwtAuthGuard } from 'src/auth/guards';
import {
  DebtorRepresentativeArgType,
  DebtorRepresentativeBulkArgType,
  DebtorRepresentativeCreateDto,
  DebtorRepresentativeUpdateDto,
} from 'src/factoring/dtos';
import { DebtorEntity } from 'src/factoring/entities';
import { DebtorFindQueryInterface } from 'src/factoring/interfaces';
import { DebtorLoader } from 'src/factoring/loaders';
import { mapDebtorRepresentativeToModel, mapDebtorToModel } from 'src/factoring/mappers';
import { DebtorModel, DebtorRepresentativeModel, DebtorRepresentativePageModel } from 'src/factoring/models';
import { DebtorRepresentativeRepository } from 'src/factoring/repositories';
import { DebtorRepresentativeService } from 'src/factoring/services';
import { ParseUUIDStringPipe } from 'src/library/pipes';
import { UtilityService } from 'src/library/services';

@Resolver(() => DebtorRepresentativeModel)
export class DebtorRepresentativeResolver {
  constructor(
    @InjectRepository(DebtorRepresentativeRepository)
    private readonly debtorRepresentativeRepository: DebtorRepresentativeRepository,
    private readonly debtorRepresentativeService: DebtorRepresentativeService,
    private readonly utilityService: UtilityService,
  ) {}

  @Query(() => DebtorRepresentativeModel)
  @UseGuards(JwtAuthGuard)
  async debtorRepresentative(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,

    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorRepresentativeModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorRepresentativeEntity = await this.debtorRepresentativeService.findById(id, {
      fields,
    });

    if (!debtorRepresentativeEntity) {
      throw new NotFoundException(`DebtorRepresentative with id ${id} not found`);
    }

    return mapDebtorRepresentativeToModel(debtorRepresentativeEntity);
  }

  @Query(() => DebtorRepresentativePageModel)
  @UseGuards(JwtAuthGuard)
  async debtorRepresentatives(
    @Args({ type: () => DebtorRepresentativeArgType }) args: DebtorRepresentativeArgType,

    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorRepresentativePageModel> {
    const fields = this.utilityService.getInfoFields(info);
    const [debtorRepresentativeEntities, totalCount] = await this.debtorRepresentativeService.findAndCount({
      ...args,
      fields,
    });
    return {
      totalCount,
      data: debtorRepresentativeEntities.map((debtorRepresentativeEntity) =>
        mapDebtorRepresentativeToModel(debtorRepresentativeEntity),
      ),
    };
  }

  @Mutation(() => DebtorRepresentativeModel)
  @UseGuards(JwtAuthGuard)
  async createDebtorRepresentative(
    @Args({ name: 'debtorRepresentative', type: () => DebtorRepresentativeCreateDto })
    debtorRepresentativeData: DebtorRepresentativeCreateDto,
  ): Promise<DebtorRepresentativeModel> {
    const debtorRepresentativeEntity = await this.debtorRepresentativeService.create(debtorRepresentativeData);
    return mapDebtorRepresentativeToModel(debtorRepresentativeEntity);
  }

  @Mutation(() => DebtorRepresentativeModel)
  @UseGuards(JwtAuthGuard)
  async updateDebtorRepresentative(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
    @Args({ name: 'debtorRepresentative', type: () => DebtorRepresentativeUpdateDto })
    debtorRepresentativeData: DebtorRepresentativeUpdateDto,
  ): Promise<DebtorRepresentativeModel> {
    const debtorRepresentativeEntity = await this.debtorRepresentativeService.update(id, debtorRepresentativeData);
    return mapDebtorRepresentativeToModel(debtorRepresentativeEntity);
  }

  @Mutation(() => ID)
  @UseGuards(JwtAuthGuard)
  async deleteDebtorRepresentative(
    @Args({ name: 'id', type: () => ID }, ParseUUIDStringPipe) id: string,
  ): Promise<string> {
    return this.debtorRepresentativeService.deleteById(id);
  }

  @Mutation(() => [ID])
  @UseGuards(JwtAuthGuard)
  async deleteDebtorRepresentatives(
    @Args({ type: () => DebtorRepresentativeBulkArgType }) args: DebtorRepresentativeBulkArgType,
  ): Promise<string[]> {
    return this.debtorRepresentativeService.deleteByIds(args);
  }

  /**
   * Many-to-One Relation. There is debtorRepresentative  in one debtor.
   */
  @ResolveField(() => DebtorModel)
  async debtor(
    @Parent() debtorRepresentativeModel: DebtorRepresentativeModel,
    @Loader(DebtorLoader) debtorLoader: DataLoader<DebtorFindQueryInterface, DebtorEntity>,
    @Info() info: GraphQLResolveInfo,
  ): Promise<DebtorModel> {
    const fields = this.utilityService.getInfoFields(info);
    const debtorEntity = await debtorLoader.load({
      filter: { id: { equalTo: debtorRepresentativeModel.debtorId } },
      fields,
    });
    return mapDebtorToModel(debtorEntity);
  }
}
