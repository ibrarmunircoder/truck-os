import { UserInviteStatusEnum } from 'modules/user-invites/enums';

export interface UserInviteInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  status?: UserInviteStatusEnum;
  statusUpdatedAt?: Date;
  createdAt?: Date;
  userToken?: {
    validTill?: Date;
  };
}
