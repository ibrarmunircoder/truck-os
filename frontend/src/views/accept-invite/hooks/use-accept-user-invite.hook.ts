import { gql } from '@apollo/client';
import { localeMapping } from 'configuration/app';
import { useRouter } from 'modules/common/hooks';
import { fetchTimeZone } from 'modules/common/utils/fetch-time-zone';
import { requestGql } from 'modules/common/utils/request-gql';
import { useCallback } from 'react';

export interface UseAcceptUserInviteParamInterface {
  password: string;
  token: string;
  subscribeToMail: boolean;
}

export interface UseAcceptUserInviteResponse {
  email: string;
}

export interface UseAcceptUserInviteInterface {
  acceptUserInvite: (p: UseAcceptUserInviteParamInterface) => Promise<UseAcceptUserInviteResponse>;
}

export const useAcceptUserInvite = (): UseAcceptUserInviteInterface => {
  const router = useRouter();
  const acceptUserInvite = useCallback(async (params: UseAcceptUserInviteParamInterface) => {
    const { token, password, subscribeToMail } = params;
    const timezone = fetchTimeZone();
    const locale = localeMapping[router.locale];
    return requestGql<UseAcceptUserInviteResponse>(
      {
        mutation: gql`
          mutation AcceptUserInvite($acceptUserInvite: AcceptUserInviteDto!) {
            acceptUserInvite(acceptUserInvite: $acceptUserInvite) {
              email
            }
          }
        `,
        variables: {
          acceptUserInvite: {
            token,
            password,
            locale,
            timezone,
            subscribeToMail,
          },
        },
      },
      null,
      'acceptUserInvite',
    );
  }, []);

  return {
    acceptUserInvite,
  };
};
