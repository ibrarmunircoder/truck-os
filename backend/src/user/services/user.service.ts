import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNotFoundException } from 'src/library/exception';
import { UtilityService } from 'src/library/services';
import { UserCreateDto, UserUpdateDto } from 'src/user/dtos';
import { UserEntity } from 'src/user/entities';
import { UserFindQueryInterface } from 'src/user/interfaces';
import { UserRepository } from 'src/user/repositories';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    protected userRepository: UserRepository,
    private configService: ConfigService,
    private utilityService: UtilityService,
  ) {}

  public async create(userInput: UserCreateDto): Promise<UserEntity> {
    const { ...userData } = userInput;
    const userEntity = await this.userRepository.create(userData);

    return this.userRepository.save(userEntity);
  }

  public async update(id: string, userInput: UserUpdateDto): Promise<UserEntity> {
    const { ...userData } = userInput;
    const userEntity = await this.userRepository.preload({ id, ...userData });

    if (!userEntity) {
      throw new UserNotFoundException({ variables: { id } });
    }

    return this.userRepository.save(userEntity);
  }

  public async findById(id: string, query: UserFindQueryInterface = {}): Promise<UserEntity> {
    if (query.filter) {
      query.filter.id = { equalTo: id };
    } else {
      query.filter = { id: { equalTo: id } };
    }

    return this.userRepository.buildSelectQuery({ filter: { id: { equalTo: id } } }).getOne();
  }

  public async find(query: UserFindQueryInterface): Promise<UserEntity[]> {
    return this.userRepository.buildSelectQuery(query).getMany();
  }

  public async deleteById(id: string): Promise<string> {
    const userEntity = await this.userRepository.buildDeleteQuery({ filter: { id: { equalTo: id } } }).getOne();

    if (!userEntity) {
      throw new UserNotFoundException({ variables: { id } });
    }

    const userEntityId = userEntity.id;
    await this.userRepository.remove(userEntity);

    return userEntityId;
  }

  public async deleteByIds(query: UserFindQueryInterface): Promise<string[]> {
    const userEntities = await this.userRepository.buildDeleteQuery(query).getMany();
    const userEntityIds = userEntities.map(removedEntity => removedEntity.id);
    await this.userRepository.remove(userEntities);
    return userEntityIds;
  }

  public async findAndCount(query: UserFindQueryInterface): Promise<[UserEntity[], number]> {
    return this.userRepository.buildSelectQuery(query).getManyAndCount();
  }
}
