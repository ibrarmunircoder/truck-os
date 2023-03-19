import { UserFindQueryInterface } from 'src/user/interfaces';

export interface UserInternalFindQueryInterface extends UserFindQueryInterface {
  optedIn?: boolean;
}
