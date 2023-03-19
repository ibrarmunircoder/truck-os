import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { OrdersResultInterface } from 'modules/orders/order.slice';


interface UseOrderssInterface {
    fetchOrders: (accountId: string) => Promise<OrdersResultInterface>;
}

export const useFetchOrders = (): UseOrderssInterface => {
    const fetchOrders = async (accountId: string): Promise<OrdersResultInterface> =>
        requestGql({
            query: gql`
                query ordersQuery($filter: OrderFilterArgType!) {
                    orders(filter: $filter) {
                        totalCount
                        data {
                            id
                            invoiceNumber
                            deliveryDate
                            invoiceDate
                            applicableLaw
                            paymentTerm
                            invoiceAmount
                            receivableAmount
                            accountId
                            receivableReferenceId
                        }
                    }
                }
            `,
            variables: { filter: { accountId: { equalTo: accountId } } },
        })

    return {
        fetchOrders,
    };
};

