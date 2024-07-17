import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginPageState {
    username: string,
    password: string,
    loginAttempt: string
}

const initialState: LoginPageState = {
    username: "Username",
    password: "Password",
    loginAttempt: ""
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
        setAttempt: (state, action: PayloadAction<string>) => {
            state.loginAttempt = action.payload;
        }
    },
    selectors: {
        getUsername: (state: LoginPageState) => {
            return state.username;
        },
        getPassword: (state: LoginPageState) => {
            return state.password;
        },
        getAttempt: (state: LoginPageState) => {
            return state.loginAttempt;
        }
    }
});

export const { setUsername, setPassword, setAttempt } = loginPageSlice.actions;
export const { getUsername, getPassword, getAttempt } = loginPageSlice.selectors;

export default loginPageSlice.reducer;