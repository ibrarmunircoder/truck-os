import { createSlice } from "@reduxjs/toolkit";

export interface OrdersResultInterface {
    orders: OrderStateInterface
}

export interface OrderInterface {
    id: string;
    invoiceNumber?: string;
    deliveryDate?: Date;
    invoiceDate?: Date;
    applicableLaw?: string;
    paymentTerm?: string;
    invoiceAmount?: number;
    receivableAmount?: number;
    accountId: string;
    receivableReferenceId?: string;
}

export interface OrderStateInterface {
    data: OrderInterface[];
    totalCount: number;
}

const initialState: OrderStateInterface = {
    data: [],
    totalCount: 0
};


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getAllOrders: (state, action) => {
            state.data = action.payload?.data;
            state.totalCount = action.payload?.totalCount;
        }
    },
});

export const { getAllOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
