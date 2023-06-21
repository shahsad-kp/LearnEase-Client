import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    whiteboard: {
        context: null,
        color: 'black',
        toolbar: 'pencil'
    }
}

const whiteboardSlice = createSlice({
    name: 'whiteboard',
    initialState: initialState,
    reducers: {
        setWhiteboard: (state) => {
            const canvas = document.getElementById('canvas')
            const context = canvas.getContext('2d')
            state.whiteboard = {
                ...state.whiteboard,
                context: context,
            }
        },
        clearWhiteboard: (state, action) => {
            state.whiteboard.clearRect(0, 0, action.payload.width, action.payload.height);
        },
        drawLine(state, action) {
            const {x0, y0, x1, y1, color} = action.payload
            state.whiteboard.context.beginPath()
            state.whiteboard.context.moveTo(x0, y0)
            state.whiteboard.context.lineTo(x1, y1)
            state.whiteboard.context.strokeStyle = color
            state.whiteboard.context.stroke()
        },
    }
})

export const {setWhiteboard, clearWhiteboard, drawLine} = whiteboardSlice.actions
export default whiteboardSlice.reducer
