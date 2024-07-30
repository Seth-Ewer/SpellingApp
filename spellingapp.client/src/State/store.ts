import { configureStore } from '@reduxjs/toolkit';
import testPage from '../Pages/TestPage/TestPage.slice';
import loginPage from '../Pages/LoginPage/LoginPage.slice';
import classroom from '../Pages/Classroom/Classroom.slice';
import { classroomApi } from '../Pages/Classroom/Classroom.api';

export const store = configureStore({
    reducer: {
        testPage,
        loginPage,
        classroom,
        [classroomApi.reducerPath]: classroomApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(classroomApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;