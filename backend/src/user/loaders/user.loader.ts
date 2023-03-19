import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { NestDataLoader } from '@roq/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { UserEntity } from 'src/user/entities';
import { UserFindQueryInterface } from 'src/user/interfaces';
import { UserRepository } from 'src/user/repositories';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader implements NestDataLoader<UserFindQueryInterface, UserEntity> {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  generateDataLoader(): DataLoader<UserFindQueryInterface, UserEntity> {
    return new DataLoader<UserFindQueryInterface, UserEntity>(async (query: UserFindQueryInterface[]) => {
      const ids = query.reduce((acc, cur) => [...acc, cur.filter.id.equalTo], []);
      const data = await this.userRepository
        .buildSelectQuery({
          fields: query
            .reduce((acc, cur) => [...acc, ...cur.fields], [])
            .filter((field, i, arr) => arr.findIndex((f) => f === field) === i),
          filter: { id: { valueIn: ids } },
        })
        .getMany();
      return Promise.resolve(ids.map((id) => data.find((record) => record.id === id)));
    });
  }
}
