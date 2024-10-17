import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { classroomApi } from './Classroom.api';

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
        /*refreshState: (state) => {

        },
        saveState: (state) => {

        },*/
        addClass: (state, action: PayloadAction<Classroom>) => {
            state.classrooms = state.classrooms.concat([action.payload]);
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

export default ClassroomSlice.reducer;