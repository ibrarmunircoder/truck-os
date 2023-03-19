import { FormikHelpers } from 'formik';
import { ChangePasswordHandlerType, PasswordChangeValuesInterface } from 'modules/auth/hooks';
import { useCallback } from 'react';

export interface PasswordChangeFormValuesInterface extends PasswordChangeValuesInterface {
  repeatNewPassword: string;
}

export interface UsePasswordChangeFormInterface {
  onSubmit: (data: PasswordChangeFormValuesInterface, actions: FormikHelpers<PasswordChangeFormValuesInterface>) => Promise<boolean>;
  initialValues: PasswordChangeFormValuesInterface;
}

const initialValues: PasswordChangeFormValuesInterface = {
  password: '',
  newPassword: '',
  repeatNewPassword: ''
};

export const usePasswordChangeForm  = (
  handlePasswordChange: ChangePasswordHandlerType
): UsePasswordChangeFormInterface => {
  const onSubmit = useCallback(async (data: PasswordChangeFormValuesInterface, { resetForm }) => {
    const success = await handlePasswordChange(data);

    if (success) {
      resetForm();
    }
    return success;
  }, [ handlePasswordChange ]);

  return  { onSubmit, initialValues }
};
