import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { fetchUserInviteAction } from 'modules/user-invites/user-invites.slice';
import { useDispatch } from 'react-redux';

export interface UseFetchUserInviteHookInterface {
  fetchUserInvite: (id: string) => void;
}

export const useFetchUserInvite = (): UseFetchUserInviteHookInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserInvite = async (id: string) => {
    await dispatch(
      fetchUserInviteAction({
        query: gql`
          query GetUserInvite($id: ID!) {
            userInvite(id: $id) {
              id
              email
              firstName
              lastName
              status
              statusUpdatedAt
              userToken {
                id
                validTill
              }
            }
          }
        `,
        variables: {
          id,
        },
        context: { service: 'platform' },
      }),
    );
  };

  return {
    fetchUserInvite,
  };
};
