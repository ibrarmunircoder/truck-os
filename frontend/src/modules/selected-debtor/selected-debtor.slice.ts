import { createSlice } from "@reduxjs/toolkit";
import { DebtorInterface } from "modules/debtors/interfaces";


export interface SelectedDebtorStateInterface {
    selectedDebtorData?: DebtorInterface;
    savedDebtorData?: DebtorInterface;
}

const initialState: SelectedDebtorStateInterface = {
    selectedDebtorData: null,
    savedDebtorData: null
};


export const selectedDebtorSlice = createSlice({
    name: 'selectedDebtor',
    initialState,
    reducers: {
        setChooseDebtor: (state, action) => {
            state.selectedDebtorData = action.payload
        },
        addDebtorData: (state, action) => {
            state.savedDebtorData = action.payload
        },
        updateDebtorData: (state, action) => {
            state.savedDebtorData = {
                ...action.payload,
                debtorRepresentatives: { ...state.savedDebtorData.debtorRepresentatives }
            }
        },
        addDebtorRepresentativeData: (state, action) => {
            state.savedDebtorData = {
                ...state.savedDebtorData,
                debtorRepresentatives: {
                    data: [...state.savedDebtorData?.debtorRepresentatives?.data, action.payload]
                }
            }
        },
        updateRepresentativeData: (state, action) => {
            const newReprsentativesData = state.savedDebtorData.debtorRepresentatives.data.map((repre)=>repre.id === action.payload.id ? action.payload : repre);
            state.savedDebtorData = {
                ...state.savedDebtorData,
                debtorRepresentatives: {
                    data: newReprsentativesData
                }
            }
        },
    },
});

export const { setChooseDebtor, addDebtorData, addDebtorRepresentativeData, updateDebtorData, updateRepresentativeData } = selectedDebtorSlice.actions;

export default selectedDebtorSlice.reducer;
