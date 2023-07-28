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
            state.whiteboard.tool = payload.payload;
        },
        addLine: (state, payload) => {
            state.whiteboard.pendingLines.push(payload.payload);
        },
        clearLines: (state) => {
            state.whiteboard.pendingLines = [];
        },
        clearWhiteboardData: state => {
            state.whiteboard = initialState.whiteboard;
        }
    }
})

export const {
    changeColor,
    changeTool,
    clearLines,
    addLine,
    clearWhiteboardData
} = whiteboardSlice.actions
export default whiteboardSlice.reducer
