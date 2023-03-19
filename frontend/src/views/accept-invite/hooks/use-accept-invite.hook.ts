import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useAcceptUserInvite } from 'views/accept-invite/hooks/use-accept-user-invite.hook';
import { useValidateToken, ValidateTokenInterface } from 'views/accept-invite/hooks/use-validate-token.hook';
import { useLogin } from 'views/login/hooks';

interface UseAcceptInviteInterface {
  handleAcceptInvite: (param: HandleAcceptInviteParamInterface) => void;
  tokenValidation: ValidateTokenInterface;
  isLoading: boolean;
}

interface HandleAcceptInviteParamInterface {
  password: string;
  subscribeToMail: boolean;
}

export const useAcceptInvite = (): UseAcceptInviteInterface => {
  const { isReady, query } = useRouter();

  const [tokenValidation, setTokenValidation] = useState<ValidateTokenInterface>({
    isValid: true,
    isExpired: null,
  });

  const { validateToken } = useValidateToken();
  const { handleLogin, isLoading } = useLogin();
  const { acceptUserInvite } = useAcceptUserInvite();

  useEffect(() => {
    if (!isReady) return;
    if(query.token)
    {
      validateToken(query.token as string)
        .then(({ isValid, isExpired, email }: ValidateTokenInterface) =>
          setTokenValidation({ isExpired, isValid, email }),
        )
        .catch((e) => {
          console.error(e);
          setTokenValidation({ isValid: false });
        });
    }
  }, [query.token]);

  const handleAcceptInvite = useCallback(
    async (param: HandleAcceptInviteParamInterface) => {
      const { password, subscribeToMail } = param;
      const result = await acceptUserInvite({ token:query.token as string, password, subscribeToMail });
      const { email } = result;
      handleLogin({ email, password });
    },
    [query.token, tokenValidation],
  );

  return {
    isLoading,
    handleAcceptInvite,
    tokenValidation,
  };
};
