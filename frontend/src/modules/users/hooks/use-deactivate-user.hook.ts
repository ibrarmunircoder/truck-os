import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { deactivateUserAction } from 'modules/users/users.slice';
import { useDispatch } from 'react-redux';

export interface UseDeactivateUserInterface {
  deactivateUser: (id: string) => Promise<void>;
}

export const useDeactivateUser = (): UseDeactivateUserInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const deactivateUser = async (id: string) => {
    await dispatch(
      deactivateUserAction({
        mutation: gql`
          mutation DeactivateUser($id: ID!) {
            deactivateUser(id: $id) {
              active
            }
          }
        `,
        variables: { id },
      }),
    );
  };

  return {
    deactivateUser,
  };
};
