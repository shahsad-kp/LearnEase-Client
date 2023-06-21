import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from './authSlice/authSlice.js';
import ClassReducer from './classRoomSlice/classRoomSlice.js';
import WhiteboardReducer from "./whiteboardSlice/whiteboardSlice.js";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        classRoom: ClassReducer,
        whiteboard: WhiteboardReducer
    }
})

export default store;