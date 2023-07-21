import AuthReducer from './authSlice/authSlice.js';
import ClassReducer from './classRoomSlice/classRoomSlice.js';
import WhiteboardReducer from "./whiteboardSlice/whiteboardSlice.js";
import UtilitiesReducer from "./utilitiesSlice/utilitiesSlice.js";

import {configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        classRoom: ClassReducer,
        whiteboard: WhiteboardReducer,
        utilities: UtilitiesReducer,
    }
})

const persistor = persistStore(store);

export {store, persistor};
