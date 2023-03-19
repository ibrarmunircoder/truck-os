import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import routes from 'routes';

interface UseCreateInvoiceHookInterface {
  handleCreateInvoice: (debtorId: string, receivableAmount: number) => void;
  resetError: () => void;
  setErrorMessage: (errMsg) => void;
  error: null;
  loading: boolean;
}

const createInvoiceMutationOptions = (orderId: string, receivableAmount: number) => ({
  mutation: gql`
    mutation createInvoice($id: ID!, $receivableAmount: Float!) {
      createInvoice(orderId: $id, receivableAmount: $receivableAmount)
    }
  `,
  variables: { id: orderId, receivableAmount },
});

export const useCreateInvoice = (): UseCreateInvoiceHookInterface => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetError = ()=>{
    setError(null);
  }

  const setErrorMessage = (errMessage) => {
    setError(errMessage);
  }

  const handleCreateInvoice = async (orderId: string, receivableAmount: number) => {
    setLoading(true);
    try {
      if (!orderId || !receivableAmount) {
        return null;
      }
      await requestGql(createInvoiceMutationOptions(orderId, receivableAmount), null, 'createInvoice');
      await router.replace({
        pathname: `/${routes.paymentStatus}`,
      });
      setLoading(false);
    } catch (err) {
      setError(err);
      console.error(err);
      setLoading(false);
    }
  };

  return {
    handleCreateInvoice,
    error,
    resetError,
    loading,
    setErrorMessage
  };
};
