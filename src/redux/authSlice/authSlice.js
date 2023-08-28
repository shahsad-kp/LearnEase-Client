import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        emailVerified: (state) => {
            state.user.isVerified = true;
        }
    }
})

export default authSlice.reducer
export const {login, logout, updateUser, emailVerified} = authSlice.actions;
