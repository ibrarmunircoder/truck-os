import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SessionModel } from 'src/auth/models';
import { mapUserToModel } from 'src/user/mappers';
import { UserModel } from 'src/user/models';
import { UserService } from 'src/user/services';

@Resolver(() => SessionModel)
export class SessionResolver {
  constructor(private readonly userService: UserService,) {
  }

  @ResolveField(() => UserModel, { nullable: true })
  async user(
    @Parent() sessionModel: SessionModel,
  ): Promise<UserModel | null> {
    if (!sessionModel.userId) {return null;}
    const userEntity = await this.userService.findById(sessionModel.userId, {});
    return mapUserToModel(userEntity);
  }
}
