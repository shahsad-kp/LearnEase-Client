import {createSlice} from "@reduxjs/toolkit";

const utilitiesSlice = createSlice({
    name: 'utilities',
    initialState: {
        pendingSignalMessages: []
    },
    reducers: {
        addPendingSignalMessage: (state, action) => {
            state.pendingSignalMessages.push(action.payload)
        },
        clearPendingSignalMessages: (state) => {
            state.pendingSignalMessages = []
        }
    }
})

export const {addPendingSignalMessage, clearPendingSignalMessages} = utilitiesSlice.actions;
export default utilitiesSlice.reducer;
