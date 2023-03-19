import { AppDispatch } from 'configuration/redux/store';
import { restorePasswordAction } from 'modules/auth/auth.slice';
import { useRouter } from 'modules/common/hooks';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import routes from 'routes';
import {
  useValidateRestorePasswordToken,
  ValidateRestorePasswordToken,
} from 'views/restore-password/hooks/use-validate-restore-password-token.hook';

interface RestorePasswordValuesInterface {
  token: string;
  password: string;
}

interface UseRestorePasswordInterface {
  handleRestorePassword: (response: RestorePasswordValuesInterface) => void;
  error: boolean;
  tokenValidation?: ValidateRestorePasswordToken;
  token:string;
}

export const useRestorePassword = (): UseRestorePasswordInterface => {
  const [tokenValidation, setTokenValidation] = useState<ValidateRestorePasswordToken>({
    isValid: null,
    isExpired: null,
    isLoading: true
  });
  const { validateToken } = useValidateRestorePasswordToken();

  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const { push, query } = router;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!router.isReady) return;
    if(query.token)
    {
      validateToken(query.token as string)
      .then(({ isValid, isExpired, email }: ValidateRestorePasswordToken) =>
        setTokenValidation({ isExpired, isValid, email, isLoading: false }),
      )
      .catch((e) => {
        console.error(e);
        setTokenValidation({ isValid: false, isLoading: false });
      });
    }
    
  }, [query.token]);

  const handleRestorePassword = async (values: RestorePasswordValuesInterface) => {
    const result = await dispatch(restorePasswordAction({ data: values }));
    if (result.type === restorePasswordAction.fulfilled.toString()) {
      await push({ route: routes.home });
    }

    if (result.type === restorePasswordAction.rejected.toString()) {
      setError(true);
    }
  };

  return {
    error,
    handleRestorePassword,
    tokenValidation,
    token: query.token as string
  };
};
