import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TestPageState {
    totalScore: number;
}

const initialState: TestPageState = {
    totalScore: 0
}

export const testPageSlice = createSlice({
    name: 'testPage',
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.totalScore += action.payload;
        }
    },
    selectors: {
        getCurrentScore: (state: TestPageState) => {
            return state.totalScore;
        }
    }
});

export const { increment } = testPageSlice.actions;
export const { getCurrentScore } = testPageSlice.selectors;

export default testPageSlice.reducer;