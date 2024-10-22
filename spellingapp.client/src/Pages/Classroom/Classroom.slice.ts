import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { classroomApi } from './Classroom.api';
import {  } from "immer";

export interface Classroom {
    id: string,
    name: string,
    tests: Array<string>
}
export interface ClassroomState {
    classrooms: Array<Classroom>
}

const initialState: ClassroomState = {
    classrooms: []
}

export const ClassroomSlice = createSlice({
    name: 'classroom',
    initialState,
    reducers: {
        resetState: (state, action: PayloadAction<Array<Classroom>>) => {
            state.classrooms.splice(0, state.classrooms.length);
            action.payload.forEach(x => state.classrooms.push(x));
        },
        addClass: (state, action: PayloadAction<Classroom>) => {
            state.classrooms.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            classroomApi.endpoints.getClassroom.matchFulfilled,
            (state, action) => {
                const index = state.classrooms.findIndex(x => x.id == action.payload.id);
                if (index == -1)
                    state.classrooms.push(action.payload);
                else
                    state.classrooms.splice(index, 1, action.payload);
            }
        )
    },
    selectors: {
        getList: (state: ClassroomState) => {
            return state.classrooms;
        }
    }
});

export const { addClass } = ClassroomSlice.actions;
export const { getList } = ClassroomSlice.selectors;
export const { resetState } = ClassroomSlice.actions;

export default ClassroomSlice.reducer;