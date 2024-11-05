import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { classroomApi } from './Classroom.api';

export interface Classroom {
    id: string,
    name: string,
    tests: Array<string>
}
export interface ClassroomState {
    classrooms: Array<Classroom>,
    loading: string
}

const initialState: ClassroomState = {
    classrooms: [],
    loading: ""
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
        },
        setLoading: (state, action: PayloadAction<string>) => {
            state.loading = action.payload;
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
        ),
        builder.addMatcher(
            classroomApi.endpoints.getClassrooms.matchFulfilled,
            (state, action) => {
                //Empty state
                state.classrooms = [];
                //Fill state
                action.payload.forEach((item) => state.classrooms.push(item));
            }
        )

    },
    selectors: {
        getList: (state: ClassroomState) => {
            return state.classrooms;
        },
        getLoading: (state: ClassroomState) => {
            return state.loading;
        }
    }
});

export const { addClass } = ClassroomSlice.actions;
export const { resetState } = ClassroomSlice.actions;
export const { setLoading } = ClassroomSlice.actions;
export const { getList } = ClassroomSlice.selectors;
export const { getLoading } = ClassroomSlice.selectors;

export default ClassroomSlice.reducer;