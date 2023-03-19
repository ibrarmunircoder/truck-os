import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { cancelUserInviteAction } from 'modules/user-invites/actions';
import { useDispatch } from 'react-redux';

export interface UseCancelUserInviteInterface {
  cancelUserInvite: (id: string) => Promise<void>;
}

export const useCancelUserInvite = (): UseCancelUserInviteInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const cancelUserInvite = async (id: string) => {
    await dispatch(
      cancelUserInviteAction({
        mutation: gql`
          mutation CancelUserInvite($id: ID!) {
            cancelUserInvite(id: $id) {
              id
              status
              statusUpdatedAt
            }
          }
        `,
        variables: { id },
      }),
    );
  };

  return {
    cancelUserInvite,
  };
};
