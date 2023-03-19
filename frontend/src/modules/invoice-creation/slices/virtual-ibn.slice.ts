import { createSlice } from '@reduxjs/toolkit';

export interface VirtualIbnStateInterface {
    virtualIBN : boolean
}

const initialState: VirtualIbnStateInterface = {
    virtualIBN: false
};

export const virtualIbnSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setVirtualIbn: (state, action) => {
            state.virtualIBN = action.payload;
        },
    },
});

export default virtualIbnSlice.reducer;

export const { setVirtualIbn } = virtualIbnSlice.actions;
