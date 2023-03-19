import { AccountInterface } from 'views/account-settings/interfaces';

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  timezone: string;
  locale: string;
  active: boolean;
  optedInAt?: Date;
  lastLogin: {
    timestamp: string;
  };
  account: AccountInterface;
}
