import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Classroom } from './Classroom.slice';

export const classroomApi = createApi({
    reducerPath: 'classroomApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/classrooms' }),
    //tagTypes: ["classrooms"],
    endpoints: (builder) => ({
        getClassroom: builder.query<Classroom, string>({
            query: (id) => `${id}`,
            //providesTags: ["classrooms"]
        }),
        getClassrooms: builder.query<Array<Classroom>, void>({
            query: () => ({
                url: '/',
                method: 'GET'
            })
        }),
        createClassroom: builder.mutation<Classroom, Partial<Classroom>>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body
            }),
            //invalidatesTags: ['classrooms']
        }),
        updateClassroom: builder.mutation<Classroom, Partial<Classroom>>({
            query: (body) => ({
                url: `/${body.id}`,
                method: 'POST',
                body
            })
        })
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateClassroomMutation, useGetClassroomQuery, useGetClassroomsQuery } = classroomApi;