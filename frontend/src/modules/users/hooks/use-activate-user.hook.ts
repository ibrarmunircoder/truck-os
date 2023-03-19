import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { activateUserAction } from 'modules/users/users.slice';
import { useDispatch } from 'react-redux';

export interface UseActivateUserInterface {
  activateUser: (id: string) => Promise<void>;
}

export const useActivateUser = (): UseActivateUserInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const activateUser = async (id: string) => {
    await dispatch(
      activateUserAction({
        mutation: gql`
          mutation ActivateUser($id: ID!) {
            activateUser(id: $id) {
              active
            }
          }
        `,
        variables: { id },
      }),
    );
  };

  return {
    activateUser,
  };
};
