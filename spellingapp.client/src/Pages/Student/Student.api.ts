import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Student } from './Student.slice';

export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/students' }),
    endpoints: (builder) => ({
        createStudent: builder.query<Student, Partial<Student>>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            }),
        }),
        getStudent: builder.query<Student, string>({
            query: (id) => ({
                url: `${id}`,
                method: 'GET'
            })
        }),
        getStudents: builder.query<Student, void>({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        }),
        deleteStudent: builder.query<Student, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { useCreateStudentMutation, useGetStudentQuery, useGetStudentsQuery, useDeleteStudentMutation } = studentApi;