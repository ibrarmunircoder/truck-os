import { QueryFilterInterface, QueryInterface, StringFilterInterface } from 'src/library/interfaces';

export interface AccountFilesFindQueryInterface extends QueryInterface {
  filter?: QueryFilterInterface & {
    accountId?: StringFilterInterface;
    fileCategory?: StringFilterInterface;
  };
}
