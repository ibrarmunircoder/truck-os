import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtorRepresentativeCreateDto, DebtorRepresentativeUpdateDto } from 'src/factoring/dtos';
import { DebtorRepresentativeEntity } from 'src/factoring/entities';
import { DebtorRepresentativeFindQueryInterface } from 'src/factoring/interfaces';
import { DebtorRepository, DebtorRepresentativeRepository } from 'src/factoring/repositories';
import { UtilityService } from 'src/library/services';

@Injectable()
export class DebtorRepresentativeService {
  constructor(
    @InjectRepository(DebtorRepresentativeRepository)
    protected debtorRepresentativeRepository: DebtorRepresentativeRepository,
    @InjectRepository(DebtorRepository)
    protected debtorRepository: DebtorRepository,
    protected configService: ConfigService,
    protected utilityService: UtilityService,
  ) {}

  public async create(debtorRepresentativeInput: DebtorRepresentativeCreateDto): Promise<DebtorRepresentativeEntity> {
    const { debtorId, ...debtorRepresentativeData } = debtorRepresentativeInput;
    const debtorRepresentativeEntity = await this.debtorRepresentativeRepository.create(debtorRepresentativeData);

    if (debtorId) {
      const debtorEntity = await this.debtorRepository.findOne(debtorId);
      if (!debtorEntity) {
        throw new NotFoundException(`Debtor with id ${debtorId} not found`);
      }
      debtorRepresentativeEntity.debtor = debtorEntity;
    }

    return this.debtorRepresentativeRepository.save(debtorRepresentativeEntity);
  }

  public async update(
    id: string,
    debtorRepresentativeInput: DebtorRepresentativeUpdateDto,
  ): Promise<DebtorRepresentativeEntity> {
    const { debtorId, ...debtorRepresentativeData } = debtorRepresentativeInput;
    const debtorRepresentativeEntity = await this.debtorRepresentativeRepository.preload({
      id,
      ...debtorRepresentativeData,
    });

    if (!debtorRepresentativeEntity) {
      throw new NotFoundException(`DebtorRepresentative with id ${id} not found`);
    }

    if (debtorId) {
      const debtorEntity = await this.debtorRepository.findOne(debtorId);
      if (!debtorEntity) {
        throw new NotFoundException(`Debtor with id ${debtorId} not found`);
      }
      debtorRepresentativeEntity.debtor = debtorEntity;
    } else {
      debtorRepresentativeEntity.debtor = null;
    }

    return this.debtorRepresentativeRepository.save(debtorRepresentativeEntity);
  }

  public async findById(
    id: string,
    query: DebtorRepresentativeFindQueryInterface = {},
  ): Promise<DebtorRepresentativeEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.debtorRepresentativeRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: DebtorRepresentativeFindQueryInterface): Promise<DebtorRepresentativeEntity[]> {
    return this.debtorRepresentativeRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const debtorRepresentativeEntity = await this.debtorRepresentativeRepository
      .buildDeleteQuery({ filter: { id: { equalTo: id } } })
      .getOne();

    if (!debtorRepresentativeEntity) {
      throw new NotFoundException(`DebtorRepresentative with id ${id} not found`);
    }
    const debtorRepresentativeEntityId = debtorRepresentativeEntity.id;
    await this.debtorRepresentativeRepository.remove(debtorRepresentativeEntity);

    return debtorRepresentativeEntityId;
  }

  public async deleteByIds(query: DebtorRepresentativeFindQueryInterface): Promise<string[]> {
    const debtorRepresentativeEntities = await this.debtorRepresentativeRepository.buildDeleteQuery(query).getMany();
    const debtorRepresentativeEntitiesIds = debtorRepresentativeEntities.map((removedEntity) => removedEntity.id);
    await this.debtorRepresentativeRepository.remove(debtorRepresentativeEntities);
    return debtorRepresentativeEntitiesIds;
  }

  public async findAndCount(
    query: DebtorRepresentativeFindQueryInterface,
  ): Promise<[DebtorRepresentativeEntity[], number]> {
    return this.debtorRepresentativeRepository.buildSelectQuery(query).getManyAndCount();
  }
}
