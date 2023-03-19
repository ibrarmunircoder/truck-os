import { gql } from '@apollo/client';
import { localeMapping } from 'configuration/app';
import { AppDispatch } from 'configuration/redux/store';
import { registerAction } from 'modules/auth/auth.slice';
import { useResetAuthError } from 'modules/auth/hooks';
import { authSelector } from 'modules/auth/selectors';
import { useRouter } from 'modules/common/hooks';
import { fetchTimeZone } from 'modules/common/utils/fetch-time-zone';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface RegisterErrorInterface {
  message: string;
}

interface RegisterFormValuesInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  timezone: string;
  locale: string;
}

interface UseRegisterInterface {
  email: string;
  error: RegisterErrorInterface;
  isSubmitted: boolean;
  handleRegister: (response: RegisterFormValuesInterface) => void;
  resetError: () => void;
}

export const useRegister = (): UseRegisterInterface => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { resetAuthError: resetError } = useResetAuthError();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const state = useSelector(authSelector);

  const { error } = state;

  const handleRegister = async (formValues: RegisterFormValuesInterface) => {
    formValues.timezone = fetchTimeZone();
    formValues.locale = localeMapping[router.locale];

    const result = await dispatch(
      registerAction({
        mutation: gql`
          mutation registerMutation($data: RegisterDto!) {
            register(input: $data) {
              status
              message
            }
          }
        `,
        variables: { data: formValues },
      }),
    );

    if (result.type === registerAction.fulfilled.toString()) {
      setIsSubmitted(true);
      setEmail(formValues.email);
    }
  };

  return {
    email,
    error,
    isSubmitted,
    handleRegister,
    resetError,
  };
};
