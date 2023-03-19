import { QueryFilterInterface, QueryInterface, StringFilterInterface } from 'src/library/interfaces';

export interface OrderFilesFindQueryInterface extends QueryInterface {
  filter?: QueryFilterInterface & {
    orderId?: StringFilterInterface;
    fileCategory?: StringFilterInterface;
  };
}
