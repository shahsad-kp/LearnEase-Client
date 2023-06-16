import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from './authSlice/authSlice.js';
import ClassReducer from './classRoomSlice/classRoomSlice.js';

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        classRoom: ClassReducer,
    }
})

export default store;