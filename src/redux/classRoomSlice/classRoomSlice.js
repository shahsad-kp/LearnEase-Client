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
            if (!state.classRoom.students) return;
            state.classRoom.students.push(action.payload)
        },
        changeAudioSetting: (state, action) => {
            if (state.classRoom) {
                const userId = action.payload.userId;
                const value = action.payload.value;
                const isLecturer = action.payload.isLecturer;
                if (isLecturer) {
                    state.classRoom.lecturer.settings.audio = value;
                } else {
                    state.classRoom.students.map(student => {
                        if (student.id === userId) {
                            student.settings.audio.enabled = value;
                        }
                        return student;
                    })
                }
            }
        },
        changeVideoSetting: (state, action) => {
            if (state.classRoom) {
                const userId = action.payload.userId;
                const value = action.payload.value;
                const isLecturer = action.payload.isLecturer;
                if (isLecturer) {
                    state.classRoom.lecturer.settings.video = value;
                } else {
                    state.classRoom.students.map(student => {
                        if (student.id === userId) {
                            student.settings.video.enabled = value;
                        }
                        return student;
                    })
                }
            }
        },
        changeScreenShareSetting: (state, action) => {
            if (state.classRoom) {
                const userId = action.payload.userId;
                const value = action.payload.value;
                const isLecturer = action.payload.isLecturer;
                if (isLecturer) {
                    state.classRoom.lecturer.settings.screenShare = value;
                } else {
                    state.classRoom.students.map(student => {
                        if (student.id === userId) {
                            student.settings.screenShare.enabled = value;
                        }
                        return student;
                    })
                }
            }
        }
    }
})

export default classRoomSlice.reducer;
export const {
    joinClassRoom,
    leaveClassRoom, addParticipant,
    changeAudioSetting,
    changeVideoSetting,
    changeScreenShareSetting
} = classRoomSlice.actions;
