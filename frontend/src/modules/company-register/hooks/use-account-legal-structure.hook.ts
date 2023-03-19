import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { AccountLegalStructure } from 'modules/company-register/interfaces';
import { useCallback, useState } from 'react';

interface UseAccountLegalStructureHookInterface {
  legalStructures: AccountLegalStructure[];
  error: null;
  handleFetchAccountLegalStructures: (country?: string) => Promise<void>;
}

const accountLegalStructuresQueryOptions = (country: string) => ({
  query: gql`
    query accountLegalStructures($country: String!) {
      accountLegalStructures(country: $country) {
        elfCode
        name
      }
    }
  `,
  variables: { country },
});

export const useAccountLegalStructure = (): UseAccountLegalStructureHookInterface => {
  const [legalStructures, setLegalStructures] = useState<AccountLegalStructure[]>([]);
  const [error, setError] = useState(null);

  const handleFetchAccountLegalStructures = useCallback(
    async (country = 'DE') => {
      try {
        const response = await requestGql<AccountLegalStructure[]>(
          accountLegalStructuresQueryOptions(country),
          null,
          'accountLegalStructures',
        );
        setLegalStructures(response || []);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    },
    [setError],
  );

  return {
    error,
    legalStructures,
    handleFetchAccountLegalStructures,
  };
};
