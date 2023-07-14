import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from './authSlice/authSlice.js';
import ClassReducer from './classRoomSlice/classRoomSlice.js';
import WhiteboardReducer from "./whiteboardSlice/whiteboardSlice.js";
import UtilitiesReducer from "./utilitiesSlice/utilitiesSlice.js";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        classRoom: ClassReducer,
        whiteboard: WhiteboardReducer,
        utilities: UtilitiesReducer,
    }
})

export default store;