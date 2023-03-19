import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AcceptUserInviteDto } from 'src/userInvite/dtos';
import { CheckUserInviteTokenModel, UserInviteModel } from 'src/userInvite/models';
import { UserInviteService } from 'src/userInvite/services';

@Resolver(() => UserInviteModel)
export class UserInviteResolver {
  constructor(private readonly userInviteService: UserInviteService) {}

  @Query(() => CheckUserInviteTokenModel)
  async checkUserInviteToken(
    @Args({ name: 'token', type: () => String }) token: string,
  ): Promise<CheckUserInviteTokenModel> {
    return this.userInviteService.checkUserInviteToken(token);
  }

  @Mutation(() => UserInviteModel)
  async acceptUserInvite(
    @Args({ name: 'acceptUserInvite', type: () => AcceptUserInviteDto })
    acceptUserInvite: AcceptUserInviteDto,
  ): Promise<UserInviteModel> {
    return this.userInviteService.acceptUserInvite(acceptUserInvite);
  }
}
