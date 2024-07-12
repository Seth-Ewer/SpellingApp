import { configureStore } from '@reduxjs/toolkit';
import testPage from '../Pages/TestPage/TestPage.slice';

export const store = configureStore({
    reducer: {
        testPage
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;