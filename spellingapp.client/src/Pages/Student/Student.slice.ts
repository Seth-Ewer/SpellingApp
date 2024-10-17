import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { studentApi } from './Student.api';

export interface Student {
    id: string,
    name: string,
    classrooms: Array<string>;
}

export interface StudentState {
    currentId: string,
    currentName: string,
    currentClassrooms: Array<string>,
    students: Array<Student>
}

const initialState: StudentState = {
    currentId: "",
    currentName: "",
    currentClassrooms: [],
    students: []
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        refreshState: (state) => {

        },
        setName: (state, action: PayloadAction<string>) => {
            state.currentName = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.currentId = action.payload;
        },
        addClassroom: (state, action: PayloadAction<string>) => {
            state.currentClassrooms.push(action.payload);
        },
        removeClassroom: (state, action: PayloadAction<string>) => {
            const index = state.currentClassrooms.findIndex(x => x == action.payload);
            state.currentClassrooms.splice(index, 1)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            studentApi.endpoints.getStudents.matchFulfilled,
            (state, action) => {
                const index = state.students.findIndex(x => x.id == action.payload.id);
                if (index == -1)
                    state.students.push(action.payload);
                else
                    state.students.splice(index, 1, action.payload);
            }
        )
    },
    selectors: {
        getName: (state: StudentState) => {
            return state.currentName;
        },
        getId: (state: StudentState) => {
            return state.currentId;
        },
        getClassroomIds: (state: StudentState) => {
            return state.currentClassrooms;
        },
        getAllStudents: (state: StudentState) => {
            return state.students;
        }
    }
});

export const { setName, setId, addClassroom, removeClassroom } = studentSlice.actions;
export const { getName, getId, getClassroomIds, getAllStudents } = studentSlice.selectors;

export default studentSlice.reducer;

