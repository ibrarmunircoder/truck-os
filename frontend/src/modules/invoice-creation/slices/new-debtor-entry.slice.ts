import { createSlice } from '@reduxjs/toolkit';

export interface NewDebtorEntryStateInterface {
    isNewDebtorEntry : boolean;
    isDebtorExist : boolean;
    isExternallyVerifiedDebtorFound: boolean;
}

const initialState: NewDebtorEntryStateInterface = {
    isNewDebtorEntry: false,
    isDebtorExist: false,
    isExternallyVerifiedDebtorFound: false,
};

export const newDebtorEntrySlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setIsNewDebtorEntry: (state, action) => {
            state.isNewDebtorEntry = action.payload;
        },
        setIsDebtorExist: (state, action) => {
            state.isDebtorExist = action.payload;
        },
        setIsExternallyVerifiedDebtorFound: (state, action) => {
            state.isExternallyVerifiedDebtorFound = action.payload;
        },
    },
});

export default newDebtorEntrySlice.reducer;

export const { setIsNewDebtorEntry, setIsDebtorExist, setIsExternallyVerifiedDebtorFound } = newDebtorEntrySlice.actions;
