import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { AccountRegisterCourtInterface } from 'modules/company-register/interfaces';
import { useCallback, useState } from 'react';

interface UseAccountRegisterCourtHookInterface {
  registerCourts: AccountRegisterCourtInterface[];
  error: null;
  handleFetchAccountRegisterCourts: (country?: string) => Promise<void>;
}

const accountRegisterCourtQueryOptions = (country: string) => ({
  query: gql`
    query accountRegisterCourts($country: String!) {
      accountRegisterCourts(country: $country) {
        registerAuthorityCode
        name
      }
    }
  `,
  variables: { country },
});

export const useAccountRegisterCourts = (): UseAccountRegisterCourtHookInterface => {
  const [registerCourts, setRegisterCourts] = useState<AccountRegisterCourtInterface[]>([]);
  const [error, setError] = useState(null);

  const handleFetchAccountRegisterCourts = useCallback(
    async (country = 'DE') => {
      try {
        const response = await requestGql<AccountRegisterCourtInterface[]>(
          accountRegisterCourtQueryOptions(country),
          null,
          'accountRegisterCourts',
        );
        setRegisterCourts(response || []);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    },
    [setError],
  );

  return {
    error,
    registerCourts,
    handleFetchAccountRegisterCourts,
  };
};
