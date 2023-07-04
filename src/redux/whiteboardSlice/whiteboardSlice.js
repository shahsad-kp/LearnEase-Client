import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    whiteboard: {
        pendingLines: [],
        color: 'black',
        tool: 'pencil'
    }
}

const whiteboardSlice = createSlice({
    name: 'whiteboard',
    initialState: initialState,
    reducers: {
        changeColor: (state, payload) => {
            state.whiteboard.color = payload.payload;
            if (state.whiteboard.tool === 'eraser'){
                state.whiteboard.tool = 'pencil';
            }
        },
        changeTool: (state, payload) => {
            console.log('payload')
            state.whiteboard.tool = payload.payload;
        },
        addLine: (state, payload) => {
            state.whiteboard.pendingLines.push(payload.payload);
        },
        clearLines: (state) => {
            state.whiteboard.pendingLines = [];
        }
    },
    extraReducers: {
        'classRoom/leaveClassRoom': state => {
            state.whiteboard.pendingLines = [];
            state.whiteboard.color = 'black';
            state.whiteboard.tool = 'pencil';
        }
    }
})

export const {
    changeColor,
    changeTool,
    clearLines,
    addLine,
} = whiteboardSlice.actions
export default whiteboardSlice.reducer
