import { configureStore } from '@reduxjs/toolkit';
import testPage from '../Pages/TestPage/TestPage.slice';
import loginPage from '../Pages/LoginPage/LoginPage.slice';
import classroom from '../Pages/Classroom/Classroom.slice';
import student from '../Pages/Student/Student.slice';
import { classroomApi } from '../Pages/Classroom/Classroom.api';
import 

export const store = configureStore({
    reducer: {
        testPage,
        loginPage,
        classroom,
        student,
        [classroomApi.reducerPath]: classroomApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(classroomApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;