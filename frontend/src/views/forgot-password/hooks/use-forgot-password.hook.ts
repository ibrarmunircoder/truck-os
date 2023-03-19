import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { forgotPasswordAction } from 'modules/auth/auth.slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export interface ForgotPasswordValuesInterface {
  email: string;
}

export interface UseForgotPasswordInterface {
  email: string;
  isSubmitted: boolean;
  handleForgotPassword: (formValues: ForgotPasswordValuesInterface) => Promise<void>;
}

export const useForgotPassword = (): UseForgotPasswordInterface => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleForgotPassword = async (formValues: ForgotPasswordValuesInterface) => {
    await dispatch(
      forgotPasswordAction({
        mutation: gql`
          mutation forgotPasswordMutation($data: ForgotPasswordDto!) {
            forgotPassword(input: $data)
          }
        `,
        variables: { data: formValues },
      }),
    );

    setIsSubmitted(true);
    setEmail(formValues.email);
  };

  return {
    email,
    isSubmitted,
    handleForgotPassword,
  };
};
