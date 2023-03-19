import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginHistoryNotFoundException, UserNotFoundException } from 'src/library/exception';
import { UtilityService } from 'src/library/services';
import { UserLoginHistoryCreateDto, UserLoginHistoryUpdateDto } from 'src/user/dtos';
import { UserLoginHistoryEntity } from 'src/user/entities';
import { UserLoginHistoryFindQueryInterface } from 'src/user/interfaces';
import { UserLoginHistoryRepository, UserRepository } from 'src/user/repositories';

@Injectable()
export class UserLoginHistoryService {
  constructor(
    @InjectRepository(UserLoginHistoryRepository)
    private userLoginHistoryRepository: UserLoginHistoryRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
    private utilityService: UtilityService,
  ) { }

  public async create(userLoginHistoryInput: UserLoginHistoryCreateDto): Promise<UserLoginHistoryEntity> {
    const { userId, ...userLoginHistoryData } = userLoginHistoryInput;
    const userLoginHistoryEntity = await this.userLoginHistoryRepository.create(userLoginHistoryData);

    if (userId) {
      const userEntity = await this.userRepository.findOne(userId);
      if (!userEntity) {
        throw new UserNotFoundException({ variables: { id: userId } });
      }
      userLoginHistoryEntity.user = userEntity;
    }

    return this.userLoginHistoryRepository.save(userLoginHistoryEntity);
  }

  public async update(id: string, userLoginHistoryInput: UserLoginHistoryUpdateDto): Promise<UserLoginHistoryEntity> {
    const { userId, ...userLoginHistoryData } = userLoginHistoryInput;
    const userLoginHistoryEntity = await this.userLoginHistoryRepository.preload({ id, ...userLoginHistoryData });

    if (!userLoginHistoryEntity) {
      throw new UserLoginHistoryNotFoundException({ variables: { id } });
    }

    if (userId) {
      const userEntity = await this.userRepository.findOne(userId);
      if (!userEntity) {
        throw new UserNotFoundException({ variables: { id: userId } });
      }
      userLoginHistoryEntity.user = userEntity;
    } else {
      userLoginHistoryEntity.user = null;
    }

    return this.userLoginHistoryRepository.save(userLoginHistoryEntity);
  }

  public async findById(id: string, query: UserLoginHistoryFindQueryInterface = {}): Promise<UserLoginHistoryEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.userLoginHistoryRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: UserLoginHistoryFindQueryInterface): Promise<UserLoginHistoryEntity[]> {
    return this.userLoginHistoryRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const userLoginHistoryEntity = await this.userLoginHistoryRepository
      .buildDeleteQuery({ filter: { id: { equalTo: id } } })
      .getOne();

    if (!userLoginHistoryEntity) {
      throw new UserLoginHistoryNotFoundException({ variables: { id } });
    }

    const userLoginHistoryEntityId = userLoginHistoryEntity.id;
    await this.userLoginHistoryRepository.remove(userLoginHistoryEntity);

    return userLoginHistoryEntityId;
  }

  public async deleteByIds(query: UserLoginHistoryFindQueryInterface): Promise<string[]> {
    const userLoginHistoryEntities = await this.userLoginHistoryRepository.buildDeleteQuery(query).getMany();
    const userLoginHistoryEntityIds = userLoginHistoryEntities.map(removedEntity => removedEntity.id);
    await this.userLoginHistoryRepository.remove(userLoginHistoryEntities);
    return userLoginHistoryEntityIds;
  }

  public async findAndCount(query: UserLoginHistoryFindQueryInterface): Promise<[UserLoginHistoryEntity[], number]> {
    return this.userLoginHistoryRepository.buildSelectQuery(query).getManyAndCount();
  }
}
