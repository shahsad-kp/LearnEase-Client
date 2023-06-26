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
            const student = state.classRoom.students.find(student => student.id === action.payload.id);
            if (student) return;
            state.classRoom.students.unshift(action.payload)
        },
        removeParticipant: (state, action) => {
            if (!state.classRoom.students) return;
            state.classRoom.students = state.classRoom.students.filter(student => student.id !== parseInt(action.payload))
        },
        setMessages: (state, action) => {
            if (state.classRoom) {
                state.classRoom.messages = action.payload;
            }
        },
        addMessage: (state, action) => {
            if (state.classRoom) {
                state.classRoom.messages.push(action.payload);
            }
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
            const {id, userData, activityId, response, isSelf} = action.payload;
            if (state.classRoom) {
                state.classRoom.activities.map(activity => {
                    if (activity.id === activityId) {
                        activity.responses.push({
                            id: id,
                            name: userData.name,
                            response,
                            isCorrect: activity.correctAnswer === response
                        });
                    }
                    if (isSelf) {
                        activity.response = response;
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
    changeAudioSetting,
    changeVideoSetting,
    changeScreenShareSetting,
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
