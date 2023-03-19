import { UserInviteStatusEnum } from 'modules/user-invites/enums';
import { updateUserInviteStatusAction } from 'modules/user-invites/slices';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export interface UseUpdateUserInviteStatusInterface {
  updateUserInviteStatus: (id: string, status: UserInviteStatusEnum) => void;
}

export const useUpdateUserInviteStatus = (): UseUpdateUserInviteStatusInterface => {
  const dispatch = useDispatch();

  const updateUserInviteStatus = useCallback(
    (id, status) => {
      dispatch(
        updateUserInviteStatusAction({
          id,
          status,
        }),
      );
    },
    [dispatch],
  );

  return {
    updateUserInviteStatus,
  };
};
