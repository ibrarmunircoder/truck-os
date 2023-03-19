import { FormikErrors } from "formik";
import { UserInviteInterface } from 'modules/user-invites';
import { useCallback } from "react";
import { UserInviteFormValueInterface } from "views/users/partials/invite-list/invite-list.partial";

export interface UseInvitesParamsInterface {
  value: UserInviteFormValueInterface,
  initialValue: UserInviteInterface,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<FormikErrors<UserInviteFormValueInterface>> | Promise<void>
}

export type UseInvitesInterface =  {
  onAddRow:() => void;
  maxRowLimit: number,
};

/**
 * This hook provides custom function to fulfill the need of the use case
 * @param options
 */
export const useAddNewFormRow = (options: UseInvitesParamsInterface): UseInvitesInterface => {
  const {value, onChange, initialValue} = options;
  const maxAllowed = 10;

  const onAddRow =  useCallback(async () => {
    const {invites} = value;
    if (invites.length < maxAllowed) {
      return onChange('invites', [...invites, initialValue], false)
    }
    return;
  }, [value, maxAllowed]);

  return {
    maxRowLimit: maxAllowed,
    onAddRow
  }
}
