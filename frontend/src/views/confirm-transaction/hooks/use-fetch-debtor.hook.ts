import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { requestGql } from 'modules/common/utils/request-gql';
import { addCustomerDetails } from 'modules/invoice-creation/invoice-creation.slice';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import routes from 'routes';

interface UseFetchDebtorHookInterface {
  handleFetchDebtor: (debtorId: string) => void;
}

const fetchDebtor = (id: string) => ({
  query: gql`
    query debtor($id: ID!) {
      debtor(id: $id) {
        id
        name
        commercialRegister
        country
        legalForm
        debtorReferenceId
        city
        addressAddon
        commercialRegisterNumber
        postalCode
        streetAndNumber
      }
    }
  `,
  variables: {
    id,
  },
});

export const useFetchDebtor = (): UseFetchDebtorHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleFetchDebtor = useCallback(async (debtorId: string) => {
    const response = await requestGql(fetchDebtor(debtorId), null, 'debtor');
    if (!response) {
      return router.replace({
        pathname: routes.paymentDashboard,
      });
    }
    dispatch(addCustomerDetails(response));
  }, []);

  return {
    handleFetchDebtor,
  };
};
