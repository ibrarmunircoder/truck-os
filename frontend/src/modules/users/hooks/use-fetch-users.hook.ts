import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { OrderEnum } from 'modules/common/enums';
import { PaginationInterface } from 'modules/common/interfaces/pagination.interface';
import { fetchUsersAction } from 'modules/users/users.slice';
import { useDispatch } from 'react-redux';

interface StringFilterArgType {
  equalTo?: string;
  notEqualTo?: string;
  valueNotIn?: string[];
  valueIn?: string[];
  like?: string;
  iLike?: string;
}

interface BooleanFilterInterface {
  equalTo?: boolean;
  notEqualTo?: boolean;
}

export interface UsersPaginationInterface extends PaginationInterface {
  order?: {
    order: OrderEnum;
    sort: string;
  };
  filter?: {
    firstName?: StringFilterArgType;
    lastName?: StringFilterArgType;
    active?: BooleanFilterInterface;
  };
}

export interface UseFetchUsersHookInterface {
  fetchUsers: (query: UsersPaginationInterface) => void;
}

export const useFetchUsers = (): UseFetchUsersHookInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUsers = (query: UsersPaginationInterface) => {
    void dispatch(
      fetchUsersAction({
        query: gql`
          query usersQuery($limit: Int, $offset: Int, $order: UserOrderArgType, $filter: UserFilterArgType) {
            users(limit: $limit, offset: $offset, order: $order, filter: $filter) {
              totalCount
              data {
                id
                email
                firstName
                lastName
                locale
                active
                optedInAt
                timezone
                lastLogin {
                  timestamp
                }
                account {
                  id
                  kycStatus
                }
              }
            }
          }
        `,
        variables: {
          limit: query.limit,
          offset: query.offset,
          order: query.order,
          filter: query.filter,
        },
      }),
    );
  };

  return {
    fetchUsers,
  };
};
