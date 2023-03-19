import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useFetchOrder } from 'views/invoice-details/hooks';
import { OrderResponseInterface } from 'views/invoice-details/interfaces';

interface UseInvoiceDetailsHookInterface {
  error: null;
  loading: boolean;
  order: OrderResponseInterface;
  handleBackButton: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const useInvoiceDetails = (): UseInvoiceDetailsHookInterface => {
  const [order, setOrder] = useState<OrderResponseInterface | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleFetchOrder } = useFetchOrder();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchOrderDetailsOnMount = async () => {
      try {
        if (id) {
          setLoading(true);
          const orderResponse = await handleFetchOrder(id as string);
          setOrder(orderResponse);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    void fetchOrderDetailsOnMount();
  }, [id]);

  const handleBackButton = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    router.back();
  }, []);

  return {
    error,
    loading,
    order,
    handleBackButton,
  };
};
