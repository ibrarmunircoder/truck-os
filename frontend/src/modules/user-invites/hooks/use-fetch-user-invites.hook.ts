import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { OrderEnum } from 'modules/common/enums';
import { PaginationInterface } from 'modules/common/interfaces/pagination.interface';
import { fetchUserInvitesAction } from 'modules/user-invites/user-invites.slice';
import { useDispatch } from 'react-redux';

export interface UserInvitesQueryInterface extends PaginationInterface {
  order?: {
    order: OrderEnum;
    sort: string;
  };
  filter?: Record<string, unknown>
}

export interface UseFetchUserInvitesHookInterface {
  fetchUserInvites: (query: UserInvitesQueryInterface) => void;
}

export const useFetchUserInvites = (): UseFetchUserInvitesHookInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserInvites = (query: UserInvitesQueryInterface) => {
    void dispatch(
      fetchUserInvitesAction({
        query: gql`
          query userInvitesQuery($limit: Int, $offset: Int, $order: UserInviteOrderArgType, $filter: UserInviteFilterArgType) {
            userInvites(limit: $limit, offset: $offset, order: $order, filter: $filter) {
              totalCount
              data {
                id
                email
                firstName
                lastName
                status
                createdAt
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
        context: { service: 'platform' }
      }),
    );
  }

  return {
    fetchUserInvites,
  }
}
