import { createSlice } from '@reduxjs/toolkit';

export interface FormStepStateInterface {
    activeStep: number;
    doneSteps: number[];
    isUnfinishedRequest: boolean
}

const initialState: FormStepStateInterface = {
    activeStep: null,
    doneSteps: [],
    isUnfinishedRequest: false,
};

export const formStepSlice = createSlice({
    name: 'formstep',
    initialState,
    reducers: {
        setActiveStepAction: (state, action) => {
            state.activeStep = action.payload;
        },
        setDoneStepAction: (state, action) => {
            if (!state.doneSteps.includes(action.payload)) {
                state.doneSteps = [...state.doneSteps, action.payload];
            }
        },
        clearFormSteps: (state)=>{
            state.activeStep = null;
            state.doneSteps = [];
        },
        setUnfinishedRequest: (state, action) => {
            state.isUnfinishedRequest = action.payload;
        }
    },
});

export default formStepSlice.reducer;

export const { setActiveStepAction, setDoneStepAction, clearFormSteps, setUnfinishedRequest} = formStepSlice.actions;
