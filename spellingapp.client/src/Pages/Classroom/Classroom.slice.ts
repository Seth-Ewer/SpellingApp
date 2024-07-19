import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Classroom {
    classroomId: number,
    name: string,
    students: Array<number>,
    tests: Array<number>
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
        refreshState: (state) => {

        },
        saveState: (state) => {

        },
        addClass: (state, action: PayloadAction<Classroom>) => {
            state.classrooms = state.classrooms.concat([action.payload]);
        }
    },
    selectors: {
        getList: (state: ClassroomState) => {
            return state.classrooms;
        }
    }
});

export const { addClass } = ClassroomSlice.actions;
export const { getList } = ClassroomSlice.selectors;