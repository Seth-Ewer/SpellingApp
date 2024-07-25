import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginPageState {
    username: string,
    password: string,
    currentUser: string
}

const initialState: LoginPageState = {
    username: "Username",
    password: "Password",
    currentUser: ""
}

export const loginPageSlice = createSlice({
    name: "loginPage",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.currentUser = action.payload;
        }
    },
    selectors: {
        getUsername: (state: LoginPageState) => {
            return state.username;
        },
        getPassword: (state: LoginPageState) => {
            return state.password;
        },
        getUser: (state: LoginPageState) => {
            return state.currentUser;
        }
    }
});

export const { setUsername, setPassword, setUser } = loginPageSlice.actions;
export const { getUsername, getPassword, getUser } = loginPageSlice.selectors;

export default loginPageSlice.reducer;