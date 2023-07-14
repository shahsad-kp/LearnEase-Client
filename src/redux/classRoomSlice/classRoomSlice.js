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
        leaveClassRoom: state => {
            state.classRoom = null
        },
        addParticipant: (state, action) => {
            if (!state.classRoom.students) return;
            if (state.classRoom.lecturer.id === action.payload.id) {
                state.classRoom.lecturer.isActive = true;
                return;
            }
            const student = state.classRoom.students.find(student => student.id === action.payload.id);
            if (student){
                state.classRoom.students = state.classRoom.students.map(student => {
                    if (student.id === action.payload.id){
                        student.isActive = true;
                    }
                    return student;
                })
                return;
            }
            state.classRoom.students.unshift(action.payload)
        },
        removeParticipant: (state, action) => {
            if (!state.classRoom.students) return;
            if (state.classRoom.lecturer.id === action.payload){
                state.classRoom.lecturer.isActive = false;
                return;
            }
            state.classRoom.students = state.classRoom.students.map(student => {
                if (student.id === action.payload){
                    student.isActive = false;
                }
                return student;
            })
        },
        setMessages: (state, action) => {
            if (state.classRoom) {
                state.classRoom.messages = action.payload;
            }
        },
        addMessage: (state, action) => {
            if (state.classRoom && state.classRoom.messages) {
                state.classRoom.messages.push(action.payload);
            }
        },
        changeParticipantSettings: (state, action) => {
            if (state.classRoom){
                const {userId, settings} = action.payload;
                if (state.classRoom.lecturer.id === userId){
                    state.classRoom.lecturer.settings = {...state.classRoom.lecturer.settings, ...settings};
                } else {
                    state.classRoom.students = state.classRoom.students.map(student => {
                        if (student.id === userId){
                            student.settings = {...student.settings, ...settings};
                        }
                        return student;
                    })
                }
            }
        },
        changeAudioPermission: (state, action) => {
            if (state.classRoom) {
                const userId = action.payload.userId;
                const value = action.payload.value;
                if (state.classRoom.isLecturer) {
                    state.classRoom.students.map(student => {
                        if (student.id === userId) {
                            student.settings.audio.enabled = (value ? student.settings.audio.permission : false);
                            student.settings.audio.permission = value;
                        }
                        return student;
                    })
                }
            }
        },
        changeVideoPermission: (state, action) => {
            if (state.classRoom) {
                const userId = action.payload.userId;
                const value = action.payload.value;
                if (state.classRoom.isLecturer) {
                    state.classRoom.students.map(student => {
                        if (student.id === userId) {
                            student.settings.video.enabled = (value ? student.settings.video.permission : false);
                            student.settings.video.permission = value;
                        }
                        return student;
                    })
                }
            }
        },
        changeScreenSharePermission: (state, action) => {
            if (state.classRoom) {
                const userId = action.payload.userId;
                const value = action.payload.value;
                if (state.classRoom.isLecturer) {
                    state.classRoom.students.map(student => {
                        if (student.id === userId) {
                            student.settings.screenShare.enabled = (value ? student.settings.screenShare.permission : false);
                            student.settings.screenShare.permission = value;
                        }
                        return student;
                    })
                }
            }
        },
        setDocuments: (state, action) => {
            if (state.classRoom) {
                state.classRoom.documents = action.payload;
            }
        },
        addDocument: (state, action) => {
            if (state.classRoom) {
                state.classRoom.documents.push(action.payload);
            }
        },
        setTopics: (state, action) => {
            if (state.classRoom) {
                state.classRoom.topics = action.payload;
            }
        },
        selectTopic: (state, action) => {
            if (state.classRoom) {
                state.classRoom.selectedTopic = action.payload;
            }
        },
        setActivities: (state, action) => {
            if (state.classRoom) {
                state.classRoom.activities = action.payload;
            }
        },
        addActivity: (state, action) => {
            if (state.classRoom) {
                state.classRoom.activities.push(action.payload);
            }
        },
        addResponse: (state, action) => {
            const activityId = action.payload.activityId;
            if (state.classRoom) {
                state.classRoom.activities.map(activity => {
                    if (activity.id === activityId) {
                        activity.responses.push(action.payload);
                    }
                    return activity;
                })
            }
        },
        updateGrade: (state, action) => {
            const {grade, userId} = action.payload;
            if (state.classRoom) {
                state.classRoom.students.map(student => {
                    if (student.id === userId) {
                        student.grade = grade;
                    }
                    return student;
                })
            }
        }
    }
})

export default classRoomSlice.reducer;
export const {
    joinClassRoom,
    leaveClassRoom,
    addParticipant,
    removeParticipant,
    changeParticipantSettings,
    setMessages,
    addMessage,
    changeAudioPermission,
    changeVideoPermission,
    changeScreenSharePermission,
    setDocuments,
    addDocument,
    setTopics,
    selectTopic,
    setActivities,
    addActivity,
    addResponse
} = classRoomSlice.actions;
