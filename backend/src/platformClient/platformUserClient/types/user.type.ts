import { AccountModel } from 'src/factoring/models';
import { UserLoginHistoryPageModel } from 'src/user/models';

export interface User {
  id: string;
  email: string;
  password: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  locale?: string;
  timezone?: string;
  roqIdentifier: string;
  optedInAt?: Date;
  active?: boolean;
  sync?: boolean;
  userLoginHistories: UserLoginHistoryPageModel;
  account?: AccountModel;
  createdAt?: Date;
  updatedAt?: Date;
}
