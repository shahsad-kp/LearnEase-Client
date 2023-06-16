import {createSlice} from "@reduxjs/toolkit";

const classRoomSlice = createSlice({
    name: 'classRoom',
    initialState: {
        classRoom: null
    },
    reducers: {
        joinClassRoom: (state, action) => {
            state.classRoom = action.payload
        },
        leaveClassRoom: (state) => {
            state.classRoom = null
        },
        addParticipant: (state, action) => {
            if(!state.classRoom.participants) state.classRoom.participants = [];
            state.classRoom.participants.push(action.payload)
        },
        removeParticipant: (state, action) => {
            if(!state.classRoom.participants) state.classRoom.participants = [];
            state.classRoom.participants = state.classRoom.participants.filter(participant => participant.id !== action.payload.id)
        }
    }
})

export default classRoomSlice.reducer;
export const {joinClassRoom, leaveClassRoom, addParticipant, removeParticipant} = classRoomSlice.actions;
