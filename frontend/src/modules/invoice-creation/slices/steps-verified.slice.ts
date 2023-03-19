import { createSlice } from '@reduxjs/toolkit';

export interface StepsVerifiedStateInterface {
    isFirstStepVerified : boolean
    isSecondStepVerified : boolean
}

const initialState: StepsVerifiedStateInterface = {
    isFirstStepVerified: false,
    isSecondStepVerified: false
};

export const stepsVerifiedSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setFirstStepVerified: (state, action) => {
            state.isFirstStepVerified = action.payload;
        },
        setSecondStepVerified: (state, action) => {
            state.isSecondStepVerified = action.payload;
        },
        resetStepsVerified: (state) => {
            state.isFirstStepVerified = false;
            state.isSecondStepVerified = false;
        },
    },
});

export default stepsVerifiedSlice.reducer;

export const { setFirstStepVerified, setSecondStepVerified, resetStepsVerified } = stepsVerifiedSlice.actions;
