import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { resendUserInviteAction } from 'modules/user-invites/actions';
import { useDispatch } from 'react-redux';

export interface UseResendUserInviteInterface {
  resendUserInvite: (id: string) => Promise<void>;
}

export const useResendUserInvite = (): UseResendUserInviteInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const resendUserInvite = async (id: string) => {
    await dispatch(
      resendUserInviteAction({
        mutation: gql`
          mutation ResendUserInvite($id: ID!) {
            resendUserInvite(id: $id) {
              id
              status
              userToken {
                id
                validTill
              }
            }
          }
        `,
        variables: { id },
      }),
    );
  };

  return {
    resendUserInvite,
  };
};
