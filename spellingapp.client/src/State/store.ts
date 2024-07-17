import { configureStore } from '@reduxjs/toolkit';
import testPage from '../Pages/TestPage/TestPage.slice';
import loginPage from '../Pages/LoginPage/LoginPage.slice';

export const store = configureStore({
    reducer: {
        testPage,
        loginPage
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;